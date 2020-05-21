const Discord = require('discord.js')
const guildID = require('../models/GuildID')

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission('ADMINISTRATOR')) {
  return message.channel.send('You don\'t have permission to use this command.')
  }
  
  guildID.findOne({ GuildID: message.guild.id }, async(err, data) => {
  if(!data) {
  const newID = new guildID({
  GuildID: message.guild.id
  })
  newID.save()
  message.channel.send('Leveling has been disabled.')
  } else {
  return message.channel.send('Leveling is already disabled!')
  }
  })
}

module.exports.config = {
    name: "disablexp",
    description: "Disables leveling.",
    usage: "v!disablexp",
    accessableby: "Admins",
    aliases: ['']
}
