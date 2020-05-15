const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
let user = message.mentions.users.first()
if(!user) {
return message.channel.send('Who am I going to hack?')
}

let msg = message.channel.send('Loading**.**..')
await msg.edit('Loading.**.**.')
await msg.edit('Loading..**.**')
await msg.edit('Getting email...')
await msg.edit('Email')
}

module.exports.config = {
    name: "hack",
    description: "Hacks the person you mention but not really.",
    usage: "v!hack <mention member here>",
    accessableby: "All Members",
    aliases: ['']
}
