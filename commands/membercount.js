const Discord = require('discord.js')
const mongoose = require('mongoose')
const memberCount = require('../models/MemberCount')

module.exports.run = async (bot, message, args) => {
  memberCount.findOne({ GuildID: message.guild.id},async(err, data) => {
  let guildcount = bot.guilds.cache.get(message.guild.id)
  let channel = message.guild.channels.cache.find(channel => channel.name === `Members\: ${guildcount.memberCount}`)
  if(err) console.log(err)
  if(!data) {
  let newSettings = new memberCount({
      CountChannelID: channel.id,
      GuildID: message.guild.id
      })
  message.guild.channels.create(`Members\: ${guildcount.memberCount}`, {
  type: 'voice',
  permissionOverwrites: [
     {
       id: message.guild.id,
       deny: ['CONNECT'],
    },
  ],
})  
      newSettings.save()
    } else {
    let existsembed = new Discord.MessageEmbed()
    .setTitle('Data Already Exists')
    .setDescription('To add a member count, please use \`v!resetcount\` before using this command.')
    .setColor('RED')
    message.channel.send(existsembed)
    }
  })
}

module.exports.config = {
    name: "membercount",
    description: "Sets the settings of the member count channel.",
    usage: "v!membercount",
    accessableby: "Admins",
    aliases: ['']
}
