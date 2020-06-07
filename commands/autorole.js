const autorole = require('../models/Autorole')
const Discord = require('discord.js')
const mongoose = require('mongoose')

module.exports.run = async (bot, message, args) => {
  let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])

    if(!role) {
      return message.channel.send('You didn\'t specify a role!')
    }

    if(!message.member.hasPermission('ADMINISTRATOR')) {
      return message.channel.send('You don\'t have permission to use this command.')
    }
}

module.exports.config = {
  name: "autorole",
  description: "Sets the autorole role.",
  usage: "v!autorole <role mention | role id>",
  accessableby: "Admins",
  category: "config",
  cooldown: 10,
  aliases: []
}
