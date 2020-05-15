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

message.channel.send('Loading**.**..')
                .then(msg => {
                    setTimeout(function() {
                        msg.edit(`Loading.**.**.`)
                    }, 4000)
                .then(msg => {
                    setTimeout(function() {
                        msg.edit(`Loading..**.**`)
                    }, 4000)
                .then(msg => {
                    setTimeout(function() {
                        msg.edit(`Getting email...`)
                    }, 4000)
                .then(msg => {
                    setTimeout(function() {
                        msg.edit(`Email\: ${user.username}${email}@${domain}`)
                    }, 4000)
                .then(msg => {
                    setTimeout(function() {
                        msg.edit(`Stealing cookie pictures...`)
                    }, 4000)
                .then(msg =>
                    setTimeout(function() {
                        msg.edit(`Injecting virus...`)
                    }, 4000)
                .then(msg =>
                    setTimeout(function() {
                        msg.edit(`The dangerous hack is complete.`)
                    }, 4000)
                      })
                      })
                    })
                    })
                    })
                    })
                })
    })
}

module.exports.config = {
    name: "hack",
    description: "Hacks the person you mention but not really.",
    usage: "v!hack <mention member here>",
    accessableby: "All Members",
    aliases: ['']
}
