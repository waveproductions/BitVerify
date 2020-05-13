const Discord = require('discord.js')
const mongoose = require('mongoose')
const memberCount = require('../models/GuildCreate')

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission('ADMINISTRATOR')) {
  return message.channel.send('❌ You do not have permissions to use this command. Please contact a staff member.')
  }
  
  memberCount.deleteOne({ GuildID: message.guild.id }, (err) => console.log(err))
  let embed = new Discord.MessageEmbed()
  .setTitle('Settings Reset')
  .setDescription('Your settings have now been reset, you may now use the \`v!membercount\` command again.')
  .setColor('GREEN')
  message.channel.send(embed)
}

module.exports.config = {
    name: "resetcount",
    description: "Resets the member count if you make a mistake while setting up.",
    usage: "v!resetcount",
    accessableby: "Admins",
    aliases: ['']
}
