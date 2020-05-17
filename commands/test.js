const Discord = require('discord.js')
const guildID = require('../models/GuildID')

module.exports.run = async (bot, message, args) => {
guildID.findOne({ GuildID: message.guild.id}, async(err, data) => {
if(!data) {
let guild = bot.guilds.cache.get(data.GuildID)
message.guild.channels.create(`Members\: ${guild.memberCount}`, {
  type: 'voice',
  permissionOverwrites: [
     {
       id: message.guild.id,
       deny: ['CONNECT'],
    },
  ],
} else {
return message.channel.send('You already have a member count channel!')
    })
  })
})
}

module.exports.config = {
    name: "test",
    description: "test",
    usage: "v!test",
    accessableby: "Admins",
    aliases: ['']
}
