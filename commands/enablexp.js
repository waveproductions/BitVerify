const Discord = require('discord.js')
const mongoose = require('mongoose')
const disableXP = require('../models/DisableXP')

module.exports.run = async (bot, message, args) => {
if(!message.member.hasPermission('ADMINISTRATOR')) {
return message.channel.send('You don\'t have permission to use this command.')
}
disableXP.findOne({ GuildID: message.guild.id }, async(err, data) => {
if(data) {
disableXP.deleteOne({ GuildID: message.guild.id }, (err) => console.log(err))
message.channel.send('Leveling has been enabled.')
    } else {
    return message.channel.send('Leveling is already enabled!')
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
