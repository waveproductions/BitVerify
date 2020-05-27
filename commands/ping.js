const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
const embed = new Discord.MessageEmbed()
.setTitle('Calculating ping.....')
.setColor('BLUE')

let msg = await message.channel.send(embed)

const embed2 = new Discord.MessageEmbed()
.setTitle('Ping')
.addField('**API Latency**', `${Math.round((msg.createdTimestamp - message.createdTimestamp) - bot.ws.ping)}`)
.setColor('BLUE')

let msg2 = await msg.edit(embed2)




}

module.exports.config = {
    name: "ping",
    description: "Calculates the API latency.",
    usage: "v!ping",
    accessableby: "All Members",
    aliases: ['latency']
}
