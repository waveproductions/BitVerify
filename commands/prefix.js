const Discord = require('discord.js')
const guildPrefix = require('../models/GuildPrefix')

module.exports.run = async (bot, message, args) => {
let argsembed = new Discord.MessageEmbed()
.setTitle('Not Enough Args')
.setDescription(`❌ Please be more descriptive.

\`v!prefix <new prefix>\``)
if(!message.member.hasPermission('ADMINISTRATOR')) {
return message.channel.send('\:x\: You don\'t have permission to use this command.')
}

if(!args[0]) {
return message.channel.send(argsembed)
}

  guildPrefix.findOne({ GuildID: message.guild.id }, async(err, data) => {
  if(err) console.log(err)
  if(!data) {
  let newSettings = new guildPrefix({
      GuildID: message.guild.id,
      prefix: args[0]
  })
  newSettings.save()
  let embed = new Discord.MessageEmbed()
  .setTitle('New Prefix')
  .setDescription(`Your new prefix is now \`${args[0]}\`.`)
  .setColor('GREEN')
  message.channel.send(embed)
  } else {
  guildPrefix.deleteOne({ GuildID: message.guild.id }, (err) => console.log(err))
    let existSettings = new guildPrefix({
    GuildID: message.guild.id,
    prefix: args[0]
    })
    existSettings.save()
    let embed2 = new Discord.MessageEmbed()
    .setTitle('New Prefix')
    .setDescription(`Your new prefix is now \`${args[0]}\`.`)
    .setColor('GREEN')
    message.channel.send(embed2)
  }
})
}

module.exports.config = {
    name: "prefix",
    description: "Changes the prefix.",
    usage: "v!prefix",
    accessableby: "Admins",
    aliases: ['']
}
