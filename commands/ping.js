const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
const embed = new Discord.MessageEmbed()
.setTitle('Calculating ping.....')
.setColor('BLUE')

let msg = await message.channel.send(embed)

const embed2 = new Discord.MessageEmbed()
.setTitle('Ping')
.setColor('BLUE')

let msg2 = await msg.edit(embed2)

embed2.addField('**API Latency**', `${Math.round((msg.createdTimestamp - msg2.createdTimestamp) - bot.ws.ping)}`)


}

module.exports.config = {
    name: "ping",
    description: "Calculates the API latency.",
    usage: "v!ping",
    accessableby: "All Members",
    aliases: ['latency']
}
