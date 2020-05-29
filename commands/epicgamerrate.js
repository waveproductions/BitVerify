const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
let something = args.slice(0).join(" ")
let random = Math.round(Math.random() * 100)
if(!something) {
something = 'You are'
}
if(args.slice(0).join(" ")) {
something = `${args.slice(0).join(" ")} is`
}
let howgayembed = new Discord.MessageEmbed()
.setTitle('Epic Gamer Rate Machine')
.setDescription(`${something} ${random}% epic gamer.   😎`)
.setColor('RANDOM')
message.channel.send(howgayembed)
}

module.exports.config = {
    name: "epicgamerrate",
    description: "See how epic gamer you are.",
    usage: "v!epicgamerrate <something>",
    accessableby: "All Members",
    category: "fun",
    cooldown: 2,
    aliases: ['egrate']
}
