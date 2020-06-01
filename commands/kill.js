const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0])
    
    let replies = [
    `${member.user.username} dies in the hands of ${message.author.username}.`,
    `${member.user.username} dies to an angry mob of feminists.`,
    `${member.user.username} dies to the lack of quality memes.`,
    `${member.user.username} gets hit by a bus.`,
    `${member.user.username} died because they drank too much water.`,
    `${member.user.username} dies because they suffered from depression since they were 4.`
    ];
    
    if(!args.slice(0).join(" ")) {
    return message.channel.send('How can I kill nobody?')
    }

    let result = replies[Math.floor(Math.random()*(replies.length))]

    message.channel.send(`${result}`);

}

module.exports.config = {
    name: "kill",
    description: "A fun command that kills people but not really.",
    usage: "v!kill <person>",
    accessableby: "All Members",
    category: "fun",
    cooldown: 2,
    aliases: []
}
