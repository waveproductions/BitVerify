const Discord = require('discord.js')
const mongoose = require('mongoose')
const guildSettings = require('../models/GuildCreate')

module.exports.run = async (bot, message, args) => {
  let channel = message.mentions.channels.first()
  let role = message.mentions.roles.first()
  let argsEmbed = new Discord.MessageEmbed()
  .setTitle('Not Enough Args')
  .setDescription(`❌ Please be more descriptive.`)
  .addField('Example:', '\`v!settings <channel mention> <role mention>\`')
  .setColor('RED')
  
  if(!message.member.hasPermission("ADMINISTRATOR")) {
  return message.channel.send("❌ You do not have permissions to add roles.")
  }
  
  if(!args[0]) {
  return message.channel.send(argsEmbed)
  }
  
  if(!args[1]) {
  return message.channel.send(argsEmbed)
  }
  
  guildSettings.findOne({ GuildID: message.guild.id},async(err, data) => {
  if(err) console.log(err)
  if(!data) {
  let newSettings = new guildSettings({
      GuildID: message.guild.id,
      VerifiedRoleID: role.id,
      VerifyChannelID: channel.id
      })
    let embed = new Discord.MessageEmbed()
  .setTitle('Settings Added')
  .setDescription(`The bot will now only accept verification commands coming from ${channel} and the role that will be given is ${role}.`)
  .setColor('GREEN')    
      newSettings.save()
    message.channel.send(embed)
    } else {
    guildSettings.save()
    }
  })
}

module.exports.config = {
    name: "settings",
    description: "Sets the settings of the role and channel.",
    usage: "v!settings <channel mention | id> <role mention | id>",
    accessableby: "Admins",
    aliases: ['']
}