const Discord = require('discord.js')
const Levels = require('discord-xp')
const cookies = require('../models/Cookies')

module.exports.run = async (bot, message, args) => {
message.channel.send('WORK IN PROGRESS')
}

module.exports.config = {
    name: "userinfo",
    description: "Gets information about someone.",
    usage: "v!userinfo <member>",
    accessableby: "All Members",
    category: "utility",
    cooldown: 2,
    aliases: ['whois']
}
