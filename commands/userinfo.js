const Discord = require('discord.js')
const Levels = require('discord-xp')
const cookies = require('../models/Cookies')
const Canvas = require('canvas')

module.exports.run = async (bot, message, args) => {
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0]) || message.member;

  const canvas = Canvas.createCanvas(1000, 1250);
  const ctx = canvas.getContext('2d');

  const background = await Canvas.loadImage('././image/gray2.PNG');
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(500, 360, 110, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
  ctx.drawImage(avatar, 390, 270, 220, 220);

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
