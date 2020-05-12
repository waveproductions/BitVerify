const Discord = require('discord.js')
const mongoose = require('mongoose')
const guildSettings = require('../models/GuildCreate')

module.exports.run = async (bot, message, args) => {
  if(message.deletable) message.delete();
  guildSettings.findOne({ GuildID: message.guild.id }, async(err, data) => {
  let role = data.VerifiedRoleID
  if(err) console.log(err)
  
  if(!data) {
  return message.channel.send('The verified role and channel hasn\'t been set up, please contact an Administrator.')
  }
      
  if(message.channel.id !== 'data.VerifiedChannelID') return;
  message.guild.member.roles.add(role)
  })
 }
}

module.exports.config = {
    name: "verify",
    description: "Verifies the user.",
    usage: "v!verify",
    accessableby: "All Members",
    aliases: ['']
}
