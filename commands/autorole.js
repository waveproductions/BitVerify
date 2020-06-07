const autorole = require('../models/Autorole')
const Discord = require('discord.js')
const mongoose = require('mongoose')

module.exports.run = async (bot, message, args) => {

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
