const Discord = require("discord.js");

module.exports.run = async (bot,message, args) => {

    const person = message.mentions.users.first() || message.author
    const random = Math.round(Math.random() * 10);
    const ppLevel = "=".repeat(random)

    const embed = new Discord.MessageEmbed()
        .setTitle('PP Size Machine')
        .setDescription(`${person.username}'s Penis
        8${ppLevel}D`)
        .setColor('RANDOM')

    message.channel.send(embed);
}



module.exports.config = {
    name: "penis",
    description: "Calculates your pp size.",
    usage: "v!penis <someone>",
    accessableby: "All Members",
    aliases: ['pp', 'peepee']
  }