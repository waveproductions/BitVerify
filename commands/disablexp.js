const Discord = require('discord.js')
const mongoose = require('mongoose')
const disableXP = require('../models/DisableXP')

module.exports.run = async (bot, message, args) => {
if(!message.member.hasPermission('ADMINISTRATOR')) {
return message.channel.send('You don\'t have permission to use this command.')
}
disableXP.findOne({ GuildID: message.guild.id }, async(err, data) => {
if(!data) {
const disable = new disableXP({
GuildID: message.guild.id
})
disable.save()
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
