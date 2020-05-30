const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0])
    if(!member) {
    return message.channel.send('How am I going to shame nobody?')
    }
    message.channel.send(`🔔 SHAME 🔔 ${member} 🔔 SHAME 🔔`)
}

module.exports.config = {
    name: "shame",
    description: "Shame.",
    usage: "v!shame <member>",
    accessableby: "All Members",
    category: "fun",
    cooldown: 2,
    aliases: []
}
