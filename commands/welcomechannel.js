const Discord = require('discord.js')
const mongoose = require('mongoose')
const welcomeChannel = require('../models/WelcomeChannel')

module.exports.run = async (bot, message, args) => {
  let channel = message.mentions.channels.first() || bot.channels.cache.get(args[0])

  if(!message.member.hasPermission('ADMINISTRATOR')) {
    return message.channel.send('You don\'t have permission to use this command.')
  }

  if(!channel) {
    return message.channel.send('You did not specify a channel!')
  }

  welcomeChannel.findOne({ GuildID: message.guild.id }, async (err, data) => {
    if(!data) {
      let newSettings = new welcomeChannel({
        GuildID: message.guild.id,
        WelcomeChannelID: channel.id
      })
      let embed = new Discord.MessageEmbed()
      .setTitle('Settings Created')
      .setDescription(`Welcome messages will now go in ${channel.toString()}.`)
      .setColor('GREEN')
      message.channel.send(embed)
      newSettings.save()
    } else {
      let existsembed = new Discord.MessageEmbed()
      .setTitle('Data Already Exists')
      .setDescription('Use the command \`v!reset\` to reset your data!')
      .setColor('RED')
      message.channel.send(existsembed)
    }
  })
}

module.exports.config = {
  name: "welcomechannel",
  description: "Sets the welcome channel settings.",
  usage: "v!welcomechannel <channel>",
  accessableby: "Admins",
  category: "config",
  cooldown: 20,
  aliases: []
}
