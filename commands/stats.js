const Stats = require('../models/GuildCreate')
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  Stats.findOne({ GuildID: message.guild.id }, async(err, data) => {
  let embed = new Discord.MessageEmbed()
  .setTitle('Stats')
  .addField('**Verification Channel**', `<#${data.VerifyChannelID ? data.VerifyChannelID: 'Doesn\'t Exist'}>`, true)
  .addField('**Verification Role**', `<#${data.VerifiedRoleID ? data.VerifiedRoleID: 'Doesn\'t Exist'}>`, true)
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
