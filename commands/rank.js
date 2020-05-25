const Discord = require('discord.js')
const Levels = require('discord-xp')
const cookies = require('../models/Cookies')

module.exports.run = async (bot, message, args) => {

const target = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;
    
const cookie = cookies.findOne({ UserID: target.id, GuildID: message.guild.id }, async (err, data) => {

const user = await Levels.fetch(target.id, message.guild.id);

if (!user) return message.channel.send("This person hasn't gained any XP yet.");

let embed = new Discord.MessageEmbed()
.setAuthor(`${target.username}'s Rank`, target.displayAvatarURL())
.setDescription(`<@${user.userID}>`)
.addField('Level', `**${user.level}**`, true)
.addField('XP', `**${user.xp}**`, true)
.addField('Cookies', `:cookie: **Cookie** x**${cookie.Cookies ? cookie.Cookies: '0'}**`)
.setColor('BLUE')
.setTimestamp()
.setThumbnail(target.displayAvatarURL())
message.channel.send(embed);
    })
}

module.exports.config = {
    name: "rank",
    description: "Gets the rank of the person mentioned.",
    usage: "v!rank <mention | id>",
    accessableby: "All Members",
    aliases: ['']
}
