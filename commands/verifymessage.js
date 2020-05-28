const guildSettings = require('../models/GuildCreate')
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) {
  return message.channel.send("❌ You do not have permissions to add roles.")
  }

guildSettings.findOne({ GuildID: message.guild.id }, async(err, data) => {
  if(!data) {
  return message.channel.send('You haven\'t set your verify channel and role yet. Say \`v!settings\` to do it now!')
  }
  let argsEmbed = new Discord.MessageEmbed()
  .setTitle('Not Enough Args')
  .setDescription(`❌ Please be more descriptive.`)
  .addField('Example:', '\`v!verifymessage <channel mention>\`')
  .setColor('RED')
  let sendchannel = message.mentions.channels.first()
  if(!sendchannel) {
  return message.channel.send(argsEmbed)
  }
  let embed = new Discord.MessageEmbed()
  .setTitle('Verification')
  .setDescription(`To become a member of ${message.guild.name}, say \`v!verify\` in this channel. Make sure you read the rules!`)
  .setThumbnail(message.guild.iconURL())
  .setFooter('Have Fun!')
  .setColor('GREEN')
  let msg = await sendchannel.send(embed)
  await msg.pin()
  })
}

module.exports.config = {
    name: "verifymessage",
    description: "Gives a list of commands.",
    usage: "v!verifymessage",
    accessableby: "Admins",
    category: "utility",
    aliases: ['']
}
