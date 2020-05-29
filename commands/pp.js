const Discord = require("discord.js");

module.exports.run = async (bot,message, args) => {

    const person = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0]) || message.member
    const random = Math.round(Math.random() * 15);
    const ppLevel = "=".repeat(random)

    const embed = new Discord.MessageEmbed()
        .setTitle('PP Size Machine')
        .setDescription(`${person.user.username}'s Penis
        8${ppLevel}D`)
        .setColor('RANDOM')

    message.channel.send(embed);
}



module.exports.config = {
    name: "penis",
    description: "Calculates your pp size.",
    usage: "v!penis <someone>",
    accessableby: "All Members",
    category: "fun",
    cooldown: 2,
    aliases: ['pp', 'peepee']
  }
