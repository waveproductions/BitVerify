const Discord = require('discord.js')
const Levels = require('discord-xp')
const cookies = require('../models/Cookies')

module.exports.run = async (bot, message, args) => {
  let placeholder = ''
  let placeholder2 = ''
  let placeholder3 = ''
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0]) || message.member;
  let user = await Levels.fetch(member.id, message.guild.id)

  cookies.findOne({ GuildID: message.guild.id, UserID: member.id }, async (err, data) => {

  if(!user) {
    placeholder = '0'
    placeholder2 = '0'
  } else {
    placeholder = user.level
    placeholder2 = user.xp
  }

  if(!data.Cookies) {
    placeholder3 = '0'
  } else {
    placeholder3 = data.Cookies
  }

  let embed = new Discord.MessageEmbed()
  .setAuthor(`${member.user.username}'s Info`, member.user.displayAvatarURL())
  .addField('Level', `**${placeholder}**`, true)
  .addField('Experience', `**${placeholder2}**`, true)
  .addField('Time Joined', `Joined Server: **${member.joinedAt.toLocaleDateString()}**\nJoined Discord: **${member.user.createdAt.toLocaleDateString()}**`, true)
  .addField('Nickname', `${member.nickname ? member.nickname: 'No Nickname'}`)
  .addField('Highest Role', `${member.roles.highest.toString()}`)
  .addField('Cookies', `🍪 **Cookie** x**${placeholder3}**`)
  .setFooter(`Information from`)
  .setTimestamp()
  .setColor('BLUE')
  message.channel.send(embed)
  })
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
