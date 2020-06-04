const Discord = require('discord.js')
const Levels = require('discord-xp')
const cookies = require('../models/Cookies')
const Canvas = require('canvas')

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 330);

	// Return the result to use in the actual canvas
	return ctx.font;
};

module.exports.run = async (bot, message, args) => {

  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0]) || message.member;

  const canvas = Canvas.createCanvas(1000, 1250);
  const ctx = canvas.getContext('2d');

  const background = await Canvas.loadImage('././image/gray2.PNG');
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, 1000, 380)

  ctx.font = applyText(canvas, member.user.tag);
  ctx.fillStyle = "white";
  ctx.fillText(member.user.tag, canvas.width / 3, 475);

  ctx.beginPath();
  ctx.arc(200, 380, 120, 0, Math.PI * 2, true);
  ctx.fillStyle = "white";
  ctx.fill()
  ctx.closePath()

  ctx.beginPath();
  ctx.arc(200, 380, 110, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
  ctx.drawImage(avatar, 90, 270, 220, 220);

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
