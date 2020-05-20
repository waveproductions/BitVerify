const Discord = require('discord.js')
const guildPrefix = require('../models/GuildPrefix')

module.exports.run = async (bot, message, args) => {
  guildPrefix.findOne({ GuildID: message.guild.id }, async(err, data) => {
  let helpEmbed = new Discord.MessageEmbed()
  .setTitle('BitVerify Command List')
  .setDescription('\`settings\`, \`verify\`, \`help\`, \`verifyinstructions\`, \`reset\`, \`verifymessage\`, \`membercount\`, \`resetcount\`, \`stats\`, \`bins\`')
  .addField(`\`${data.prefix}settings <mention channel here> <mention role here>\``, 'Sets the verified role and settings.')
  .addField(`\`${data.prefix}verify\``, 'Verifies the user.')
  .addField(`\`${data.prefix}help\``, 'Sends this message!')
  .addField(`\`${data.prefix}verifyinstructions\``, 'Sends the instructions on how to setup this bot.')
  .addField(`\`${data.prefix}reset\``, 'Resets your settings just in case you mess up.')
  .addField(`\`${data.prefix}verifymessage <mention channel here>\``, 'Makes the bot send a message about how to verify so you don\'t have to. Make sure you set the settings before using this command!')
  .addField(`\`${data.prefix}membercount <channel id>\``, 'Sets the member count.')
  .addField(`\`${data.prefix}prefix <new prefix>\``, 'Sets a new prefix.')
  .addField(`\`${data.prefix}bins\``, 'A list of bins that you can use instead of pasting code snippets.')
  .addField(`\`${data.prefix}hack <mention | id | username>\``, 'A fun command that hacks people.')
  .addField(`\`${data.prefix}say <message>\``, 'Makes the bot say whatever you say.')
  .addField(`\`${data.prefix}giveaway <s | m | h | d> <channel mention> <prize>\``, 'Starts a giveaway.')
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
