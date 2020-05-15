const Discord = require('discord.js')
const guildPrefix = require('../models/GuildPrefix')

module.exports.run = async (bot, message, args) => {
if(!message.member.hasPermission('ADMINISTRATOR')) {
return message.channel.send('\:x\: You don\'t have permission to use this command.')
}

if(!args[0]) {
return message.channel.send('You did not specify a new prefix!')
}

  guildPrefix.findOne({ GuildID: message.guild.id }, async(err, data) => {
  if(err) console.log(err)
  let newSettings = new guildPrefix({
      GuildID: message.guild.id,
      prefix: args[0]
  })
  newSettings.save()
  let embed = new Discord.MessageEmbed()
  .setTitle('New Prefix')
  .setDescription(`Your new prefix is now \`${args[0]}\`.`)
  message.channel.send(embed)
})
}

module.exports.config = {
    name: "prefix",
    description: "Changes the prefix.",
    usage: "v!prefix",
    accessableby: "Admins",
    aliases: ['']
}
