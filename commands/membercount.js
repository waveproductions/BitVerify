const Discord = require('discord.js')
const mongoose = require('mongoose')
const memberCount = require('../models/MemberCount')

module.exports.run = async (bot, message, args) => {
  let channel = message.mentions.channels.first()
  let argsEmbed = new Discord.MessageEmbed()
  .setTitle('Not Enough Args')
  .setDescription(`❌ Please be more descriptive.`)
  .addField('Example:', '\`v!membercount <channel mention>\`')
  .setColor('RED')
  
  if(!message.member.hasPermission("ADMINISTRATOR")) {
  return message.channel.send("❌ You do not have permissions to use this command.")
  }
  
  if(!channel) {
  return message.channel.send(argsEmbed)
  }
  
  memberCount.findOne({ GuildID: message.guild.id},async(err, data) => {
  if(err) console.log(err)
  if(!data) {
  let newSettings = new memberCount({
      CountChannelID: channel.id
      GuildID: message.guild.id
      })
    let embed = new Discord.MessageEmbed()
  .setTitle('Settings Added')
  .setDescription(`The member count will now be in ${channel}`)
  .setColor('GREEN')    
      newSettings.save()
    message.channel.send(embed)
    } else {
    memberCount.save()
    }
  })
}

module.exports.config = {
    name: "membercount",
    description: "Sets the settings of the member count channel.",
    usage: "v!membercount <channel mention>",
    accessableby: "Admins",
    aliases: ['']
}
