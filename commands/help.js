const Discord = require('discord.js')
const guildPrefix = require('../models/GuildPrefix')

module.exports.run = async (bot, message, args) => {
  guildPrefix.findOne({ GuildID: message.guild.id }, async(err, data) => {
  let helpEmbed = new Discord.MessageEmbed()
  .setTitle('BitVerify Command List')
  .setDescription('\`settings\`, \`verify\`, \`help\`, \`verifyinstructions\`, \`reset\`, \`verifymessage\`, \`membercount\`, \`resetcount\`, \`stats\`')
  .addField('\`settings <mention channel here> <mention role here>\`', 'Sets the verified role and settings.')
  .addField('\`verify\`', 'Verifies the user.')
  .addField('\`help\`', 'Sends this message!')
  .addField('\`verifyinstructions\`', 'Sends the instructions on how to setup this bot.')
  .addField('\`reset\`', 'Resets your settings just in case you mess up.')
  .addField('\`verifymessage <mention channel here>\`', 'Makes the bot send a message about how to verify so you don\'t have to. Make sure you set the settings before using this command!')
  .addField('\`resetcount\`', 'Resets the member count if you mess up.')
  .addField('\`membercount <channel id>\`', 'Sets the member count.')
  .setFooter(`Your server's prefix for this bot is ${data.prefix}`)
  .setColor('GREEN')
  message.channel.send(helpEmbed)
  })
}

module.exports.config = {
    name: "help",
    description: "Gives a list of commands.",
    usage: "v!help",
    accessableby: "All Members",
    aliases: ['']
}
