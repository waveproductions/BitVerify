const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {

const embed2 = new Discord.MessageEmbed()
.setTitle('🏓 Ping')
.addField('**API Latency**', `\`${Math.round(bot.ws.ping)} ms\``)
.setColor('BLUE')
message.channel.send(embed2)
}

module.exports.config = {
    name: "ping",
    description: "Calculates the API latency.",
    usage: "v!ping",
    accessableby: "All Members",
    category: "fun",
    cooldown: 2,
    aliases: ['latency']
}
