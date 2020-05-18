const Discord = require('discord.js')
const mongoose = require('mongoose')
const memberCount = require('../models/MemberCount')

module.exports.run = async (bot, message, args) => {
  memberCount.findOne({ GuildID: message.guild.id},async(err, data) => {
  let guildcount = bot.guilds.cache.get(message.guild.id)
  if(err) console.log(err)
  if(!data) {
let format = new Discord.MessageEmbed()
.setTitle('Member Count')
.setDescription(`Please use one of the commands to create a member count channel.

\`v!membercount all\` Creates a member count of all the members in your server.
\`v!membercount bots\` Creates a bot count.
\`v!membercount human\` Creates a member count of all the real members in your server.`)
message.channel.send(format)
  if(args[0] === 'all') {
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
  let embed = new Discord.MessageEmbed()
  .setTitle('Count Created')
  .setDescription('The member count channel has been created.')
  .setFooter(`Members\: ${guildcount.memberCount}`)
  .setColor('GREEN')
  }
    if(args[0] === 'bots') {
    let channel = await message.guild.channels.create(`Bots\: ${guildcount.members.cache.filter(member => !member.user.bot).size}`, {
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
  let embed = new Discord.MessageEmbed()
  .setTitle('Count Created')
  .setDescription('The bot count channel has been created.')
  .setFooter(`Bots\: ${guildcount.memberCount}`)
  .setColor('GREEN')
    }
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
