const Discord = require('discord.js')
const guildID = require('../models/GuildID')

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission('ADMINISTRATOR')) {
  return message.channel.send('You don\'t have permission to use this command.')
  }
  
  guildID.findOne({ GuildID: message.guild.id }, async(err, data) => {
  if(!data) {
  return message.channel.send('Leveling is already enabled!')
  } else {
  guildID.deleteOne({ GuildID: message.guild.id }, (err) => console.log(err))
  message.channel.send('Leveling has been enabled.')
  }
  })
}

module.exports.config = {
    name: "enablexp",
    description: "Enables leveling.",
    usage: "v!enablexp",
    accessableby: "Admins",
    aliases: ['']
}
