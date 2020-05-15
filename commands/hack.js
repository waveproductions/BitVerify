const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
let emails = [
    "isgay",
    "thenormie",
    "veryunepic",
    "bigsad"
]
let email = emails[Math.floor(Math.random()*(emails.length))]
let domains = [
    "msn.com",
    "hotmail.com",
    "gmail.com"
]
let domain = domains[Math.floor(Math.random()*(domains.length))]
let user = message.mentions.users.first()
if(!user) {
return message.channel.send('Who am I going to hack?')
}

let msg = message.channel.send('Loading**.**..')
await msg.edit('Loading.**.**.')
await msg.edit('Loading..**.**')
await msg.edit('Getting email...')
await msg.edit(`Email\: ${user.username}${email}@${domain}`)
await msg.edit('Stealing cookie pictures...')
await msg.edit('Injecting virus...')
await msg.edit('The dangerous hack is complete.')
}

module.exports.config = {
    name: "hack",
    description: "Hacks the person you mention but not really.",
    usage: "v!hack <mention member here>",
    accessableby: "All Members",
    aliases: ['']
}
