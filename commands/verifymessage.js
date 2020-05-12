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
  
  let sendchannel = message.guild.channels.cache.find(data.VerifyChannelID)
  let embed = new Discord.MessageEmbed()
  .setTitle('Verification')
  .setDescription(`To become a member of ${message.guild.name}, say \`v!verify\` in this channel.`)
  .setFooter('Have Fun!')
  .setColor('GREEN')
  let msg = await sendchannel.send(embed)
  await msg.pin()
})

module.exports.config = {
    name: "verifymessage",
    description: "Gives a list of commands.",
    usage: "v!verifymessage",
    accessableby: "Admins",
    aliases: ['']
}
