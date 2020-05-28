const Discord = require('discord.js')
const Cookies = require('../models/Cookies')
const Levels = require('discord-xp')

module.exports.run = async (bot, message, args) => {
    Cookies.findOne({ UserID: message.author.id, GuildID: message.guild.id }, async (err, data) => {
    if(!args[0]) {
    let noargs = new Discord.MessageEmbed()
    .setTitle('Foods')
    .setDescription(`**Please use one of the commands to eat food.**
    
    \`v!eat cookie <amount>\``)
    .setFooter('Eating food gives you XP!')
    .setColor('BLUE')
    return message.channel.send(noargs)
    }
    })
}

module.exports.config = {
    name: "eat",
    description: "Eats whatever food you choose.",
    usage: "v!eat <food> <amount>",
    accessableby: "All Members",
    aliases: ['']
}
