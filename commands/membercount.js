const Discord = require('discord.js')
const mongoose = require('mongoose')
const memberCount = require('../models/MemberCount')

module.exports.run = async (bot, message, args) => {
  let channel = args[0]
  let argsEmbed = new Discord.MessageEmbed()
  .setTitle('Not Enough Args')
  .setDescription(`❌ Please be more descriptive.`)
  .addField('Don\'t know how to get the channel ID?', 'Read [this](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID)!')
  .setColor('RED')
  
  if(!message.member.hasPermission("ADMINISTRATOR")) {
  return message.channel.send("❌ You do not have permissions to use this command.")
  }
  
  if(!channel) {
  return message.channel.send(argsEmbed)
  }
  
  memberCount.findOne({ GuildID: message.guild.id},async(err, data) => {
  if(err) console.log(err)
  if(!data) {
  let newSettings = new memberCount({
      CountChannelID: channel,
      GuildID: message.guild.id
      })
    let embed = new Discord.MessageEmbed()
  .setTitle('Settings Added')
  .setDescription(`The member count will now be in <#${channel}>.`)
  .setColor('GREEN')    
      newSettings.save()
    message.channel.send(embed)
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
    usage: "v!membercount <channel id>",
    accessableby: "Admins",
    aliases: ['']
}
