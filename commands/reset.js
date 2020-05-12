const Discord = require('discord.js')
const mongoose = require('mongoose')
const guildSettings = require('../models/GuildCreate')

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission('ADMINISTRATOR')) {
  return message.channel.send('❌ You do not have permissions to use this command. Please contact a staff member.')
  }
  
  guildSettings.deleteOne({ GuildID: guild.id }, (err) => console.log(err))
}

module.exports.config = {
    name: "reset",
    description: "Resets the data if you make a mistake while setting up.",
    usage: "v!reset",
    accessableby: "Admins",
    aliases: ['']
}
