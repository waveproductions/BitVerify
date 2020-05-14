const Stats = require('../models/GuildCreate')
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  Stats.findOne({ GuildID: message.guild.id }, async(err, data) => {
  if(!data) {
  return message.channel.send('Admins haven\'t set up the verify channel and role yet. Please contact the admins.')
    }
  let embed = new Discord.MessageEmbed()
  .setTitle('Stats')
  .addField('**Verification Channel**', `<#${data.VerifyChannelID}>`, true)
  .addField('**Verification Role**', `<#${data.VerifiedRoleID}>`, true)
  .addField('**Server Owner**', `\`\`\`${message.guild.owner.tag}\`\`\``)
  .setThumbnail(message.guild.iconURL())
  .setFooter(`${message.guild.name}'s Stats`)
  .setColor('GREEN')
  })
}

module.exports.config = {
    name: "stats",
    description: "Gets information about the settings you have so far.",
    usage: "v!stats",
    accessableby: "All Members",
    aliases: ['']
}
