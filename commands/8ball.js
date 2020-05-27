const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    let replies = [
    "why did you even ask that? it's obvious",
    "of course, yes",
    "what do you think?",
    "duh, it's a no",
    "of course not",
    "ehhhhh, no",
    "small pp",
    "big pp"
    ];

    let result = replies[Math.floor(Math.random()*(replies.length))]

    message.channel.send(`🎱 ${result}`);

}

module.exports.config = {
    name: "8ball",
    description: "Ask the magic 8ball about your future!",
    usage: "v!8ball",
    accessableby: "All Members",
    aliases: ['8b']
}