const Discord = require('discord.js')
const Levels = require('discord-xp')
const cookies = require('../models/Cookies')

module.exports.run = async (bot, message, args) => {
const cookie = cookies.findOne({ UserID: message.author.id, GuildID: message.guild.id }, async (err, data) => {
    if(!message.guild) return;
    if(!args[0]) {
    let ripargs = new Discord.MessageEmbed()
    .setTitle('Foods')
    .setDescription(`Use one of the commands to eat food.
    
    \`v!eat cookie <amount>\``)
    .setColor('BLUE')
    message.channel.send(ripargs)
    }
    
    if(!args[1] || args[0] === 'cookie') {
    Levels.appendXP(message.author.id, message.guild.id, 10)
    const update = { UserID: message.author.id, GuildID: message.guild.id, Cookies: data.Cookies -= 1 }
    let cookieupdate = await cookies.findOneAndReplace({ UserID: message.author.id, GuildID: message.guild.id }, update)
    message.channel.send('You ate a cookie and gained 10 XP! \:cookie\:')
    }
    
    if(isNaN(args[1])) {
    return message.channel.send('That is not a number.')
    }
    
    
    })
}
module.exports.config = {
    name: "eat",
    description: "Eats cookies.",
    usage: "v!eat <food>",
    aliases: []
}
