const mongoose = require('mongoose')
const prefixSettings = require('../models/Prefix')

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission('ADMINISTRATOR')) {
  return message.channel.send('You don\'t have permission to use this command.')
  }
}

module.exports.config = {
    name: "prefix"
    description: "Sets the prefix of the bot."
    usage: "v!prefix <new prefix>",
    accessableby: "Admins",
    aliases: ['']
}
