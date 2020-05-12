const Discord = require('discord.js')
const mongoose = require('mongoose')
const guildSettings = require('../models/GuildCreate')

module.exports.run = async (bot, message, args) => {
    guildSettings.deleteOne({ GuildID: message.guild.id })
}

module.exports.config = {
    name: "reset",
    description: "Resets settings.",
    usage: "v!reset",
    accessableby: "Admins",
    aliases: ['']
}
