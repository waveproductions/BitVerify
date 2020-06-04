const Discord = require('discord.js')
const Levels = require('discord-xp')
const cookies = require('../models/Cookies')
const Canvas = require('canvas')

module.exports.run = async (bot, message, args) => {
  const canvas = Canvas.createCanvas(1000, 1250);
  const ctx = canvas.getContext('2d');
  const background = await Canvas.loadImage('././image/gray2.PNG');
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'profile.png');
message.channel.send('WORK IN PROGRESS', attachment)
}

module.exports.config = {
    name: "userinfo",
    description: "Gets information about someone.",
    usage: "v!userinfo <member>",
    accessableby: "All Members",
    category: "utility",
    cooldown: 2,
    aliases: ['whois']
}
