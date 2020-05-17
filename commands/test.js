const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
let createdChannel = message.guild.channels.create('new-voice', {
  type: 'voice',
  permissionOverwrites: [
     {
       id: message.author.id,
       deny: ['VIEW_CHANNEL'],
    },
  ],
})
console.log(createdChannel.id)
}

module.exports.config = {
    name: "test",
    description: "test",
    usage: "v!test",
    accessableby: "Admins",
    aliases: ['']
}
