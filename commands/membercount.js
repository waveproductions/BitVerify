const Discord = require('discord.js')
const mongoose = require('mongoose')
const memberCount = require('../models/MemberCount')
const botCount = require('../models/BotCount')
const humanCount = require('../models/HumanCount')

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission('ADMINISTRATOR')) {
  return message.channel.send('❌ You do not have permissions to use this command. Please contact a staff member.')
  }
  
  let guildcount = bot.guilds.cache.get(message.guild.id)
  if(!args[0]) {
let format = new Discord.MessageEmbed()
.setTitle('Member Count')
.setDescription(`Please use one of the commands to create a member count channel.

\`v!membercount all\` Creates a member count of all the members in your server.
\`v!membercount bots\` Creates a bot count.
\`v!membercount human\` Creates a member count of all the real members in your server.`)
.setColor('GREEN')
message.channel.send(format)
  } else {
if(message.author.bot || message.channel.type === 'dm') {return;}
        let messageinfocontent = message.content.toLowerCase()
  switch(args[0]){
      
    case 'all':
      memberCount.findOne({ GuildID: message.guild.id }, async(err, data) => {
        if(!data) {
  let channel = await message.guild.channels.create(`Members\: ${guildcount.memberCount}`, {
  type: 'voice',
  permissionOverwrites: [
     {
       id: message.guild.id,
       deny: ['CONNECT'],
    },
  ],
})  
  let newSettings = new memberCount({
      CountChannelID: channel.id,
      GuildID: message.guild.id
      })
      newSettings.save()
  let allembed = new Discord.MessageEmbed()
  .setTitle('Count Created')
  .setDescription('The member count channel has been created.')
  .setFooter(`Members\: ${guildcount.memberCount}`)
  .setColor('GREEN')
  message.channel.send(allembed)
        } else {
        let existsembed = new Discord.MessageEmbed()
        .setTitle('Data Already Exists')
        .setDescription('Use \`v!reset\` to reset your data.')
        .setColor('RED')
        message.channel.send(existsembed)
        }
        })
  break;
    case 'bots':
      botCount.findOne({ GuildID: message.guild.id }, async(err, data) => {
        if(!data) {
    let channel2 = await message.guild.channels.create(`Bots\: ${guildcount.members.cache.filter(member => member.user.bot).size}`, {
  type: 'voice',
  permissionOverwrites: [
     {
       id: message.guild.id,
       deny: ['CONNECT'],
    },
  ],
})  
  let newSettings2 = new botCount({
      BotCountChannelID: channel2.id,
      GuildID: message.guild.id
      })
      newSettings2.save()
  let botembed = new Discord.MessageEmbed()
  .setTitle('Bot Count Created')
  .setDescription('The bot count channel has been created.')
  .setFooter(`Bots\: ${guildcount.members.cache.filter(member => member.user.bot).size}`)
  .setColor('GREEN')
  message.channel.send(botembed)
        } else {
        let existsembed2 = new Discord.MessageEmbed()
        .setTitle('Data Already Exists')
        .setDescription('Use \`v!reset\` to reset your data.')
        .setColor('RED')
        message.channel.send(existsembed2)
        }
        })
    break;
    case 'human':
      humanCount.findOne({ GuildID: message.guild.id }, async(err, data) => {
        if(!data) {
        let channel3 = await message.guild.channels.create(`Humans\: ${guildcount.members.cache.filter(member => !member.user.bot).size}`, {
  type: 'voice',
  permissionOverwrites: [
     {
       id: message.guild.id,
       deny: ['CONNECT'],
    },
  ],
})  
  let newSettings3 = new humanCount({
      HumanCountChannelID: channel3.id,
      GuildID: message.guild.id
      })
      newSettings3.save()
  let humanembed = new Discord.MessageEmbed()
  .setTitle('Human Count Created')
  .setDescription('The human count channel has been created.')
  .setFooter(`Humans\: ${guildcount.members.cache.filter(member => !member.user.bot).size}`)
  .setColor('GREEN')
  message.channel.send(humanembed)
        } else {
        let existsembed3 = new Discord.MessageEmbed()
        .setTitle('Data Already Exists')
        .setDescription('Use \`v!reset\` to reset your data.')
        .setColor('RED')
        message.channel.send(existsembed3)
        }
        })
  }
  }
}

module.exports.config = {
    name: "membercount",
    description: "Sets the settings of the member count channel.",
    usage: "v!membercount",
    accessableby: "Admins",
    category: "config",
    cooldown: 20,
    aliases: []
}
