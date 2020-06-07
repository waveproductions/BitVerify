const Discord = require('discord.js')
const mongoose = require('mongoose')
const guildSettings = require('../models/GuildCreate')
const memberCount = require('../models/MemberCount')
const humanCount = require('../models/HumanCount')
const botCount = require('../models/BotCount')
const logChannel = require('../models/MessageLog')
const welcomeChannel = require('../models/WelcomeChannel')
const autorole = require('../models/Autorole')

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission('ADMINISTRATOR')) {
  return message.channel.send('❌ You do not have permissions to use this command. Please contact a staff member.')
  }

  if(!args[0]) {
  let argsembed = new Discord.MessageEmbed()
  .setTitle('Data Resets')
  .setDescription(`Use one of the commands to reset data of your choice.

  \`v!reset allcount\` Resets the member count that shows all the members in your server.
  \`v!reset botcount\` Resets the bot count.
  \`v!reset humancount\` Resets the human count.
  \`v!reset verification\` Resets all your verification settings.
  \`v!reset messagelog\` Resets the message log settings.
  \`v!reset welcomechannel\` Resets the welcome channel settings.
  \`v!reset autorole\` Resets the autorole settings.`)
  .setColor('GREEN')
  message.channel.send(argsembed)
  } else
if(message.author.bot || message.channel.type === 'dm') {return;}
        let messageinfocontent = message.content.toLowerCase()
    switch(args[0]) {
      case 'allcount':
        memberCount.deleteOne({ GuildID: message.guild.id }, (err) => console.log(err))
        let allembed = new Discord.MessageEmbed()
        .setTitle('Data Reset')
        .setDescription('Your all members count data has been deleted.')
        .setColor('GREEN')
        message.channel.send(allembed)
        break;
      case 'botcount':
        botCount.deleteOne({ GuildID: message.guild.id }, (err) => console.log(err))
        let botembed = new Discord.MessageEmbed()
        .setTitle('Data Reset')
        .setDescription('Your bot count data has been deleted.')
        .setColor('GREEN')
        message.channel.send(botembed)
        break;
      case 'humancount':
        humanCount.deleteOne({ GuildID: message.guild.id }, (err) => console.log(err))
        let humanembed = new Discord.MessageEmbed()
        .setTitle('Data Reset')
        .setDescription('Your human count data has been deleted.')
        .setColor('GREEN')
        message.channel.send(humanembed)
        break;
      case 'verification':
        guildSettings.deleteOne({ GuildID: message.guild.id }, (err) => console.log(err))
        let verifyembed = new Discord.MessageEmbed()
        .setTitle('Data Reset')
        .setDescription('Your verification data has been deleted.')
        .setColor('GREEN')
        message.channel.send(verifyembed)
        break;
      case 'messagelog':
        logChannel.deleteOne({ GuildID: message.guild.id }, (err) => console.log(err))
        let messagelogembed = new Discord.MessageEmbed()
        .setTitle('Data Reset')
        .setDescription('Your message log channel data has been deleted.')
        .setColor('GREEN')
        message.channel.send(messagelogembed)
        break;
      case 'welcomechannel':
      welcomeChannel.deleteOne({ GuildID: message.guild.id }, (err) => console.log(err))
      let welcomechannelembed = new Discord.MessageEmbed()
      .setTitle('Data Reset')
      .setDescription('Your welcome channel data has been deleted.')
      .setColor('RED')
      message.channel.send(welcomechannelembed)
        break;
      case 'autorole':
      autorole.deleteOne({ GuildID: message.guild.id }, (err) => console.log(err))
      let autoroleembed = new Discord.MessageEmbed()
      .setTitle('Data Reset')
      .setDescription('Your autorole data has been deleted.')
      .setColor('RED')
      message.channel.send(autoroleembed)
    }
}

module.exports.config = {
    name: "reset",
    description: "Resets the data if you make a mistake while setting up.",
    usage: "v!reset",
    accessableby: "Admins",
    category: "config",
    cooldown: 10,
    aliases: ['']
}
