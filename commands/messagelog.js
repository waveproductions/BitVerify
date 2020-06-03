const Discord = require('discord.js')
const mongoose = require('mongoose')
const logChannel = require('../models/MessageLog')

module.exports.run = async (bot, message, args) => {
  let channel = message.mentions.channels.first() || bot.channels.cache.get(args[0])
  let argsEmbed = new Discord.MessageEmbed()
  .setTitle('Not Enough Args')
  .setDescription(`❌ Please be more descriptive.`)
  .addField('Example:', '\`v!messagelog <channel mention> \`')
  .setColor('RED')

  if(!message.member.hasPermission("ADMINISTRATOR")) {
  return message.channel.send("❌ You do not have permissions to use this command.")
  }

  if(!channel) {
  return message.channel.send(argsEmbed)
  }

  logChannel.findOne({ GuildID: message.guild.id},async(err, data) => {
  if(err) console.log(err)
  if(!data) {
  let newSettings = new logChannel({
      GuildID: message.guild.id,
      MessageLogChannel: channel.id
      })
    let embed = new Discord.MessageEmbed()
  .setTitle('Settings Added')
  .setDescription(`The bot will now log messages in <#${channel.id}>.`)
  .setColor('GREEN')
      newSettings.save()
    message.channel.send(embed)
    } else {
    let existsembed = new Discord.MessageEmbed()
    .setTitle('Data Already Exists')
    .setDescription('To add message logs, please use \`v!reset\` before using this command.')
    .setColor('RED')
    message.channel.send(existsembed)
    }
  })
}

module.exports.config = {
    name: "messagelog",
    description: "Sets the settings of the message log channel.",
    usage: "v!messagelog <channel mention>",
    accessableby: "Admins",
    category: "config",
    cooldown: 30,
    aliases: ['']
}
