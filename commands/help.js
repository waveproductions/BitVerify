const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  let helpEmbed = new Discord.MessageEmbed()
  .setTitle('BitVerify Command List')
  .setDescription('\`settings\`, \`verify\`, \`help\`, \`verifyinstructions\`')
  .addField('\`settings <mention channel here> <mention role here>\`', 'Sets the verified role and settings.')
  .addField('\`verify\`', 'Verifies the user.')
  .addField('\`help\`', 'Sends this message!')
  .addField('\`verifyinstructions\`', 'Sends the instructions on how to setup this bot.')
  .addField('\`reset\`', 'Resets your settings just in case you mess up.')
  .setFooter('The prefix is v!')
  .setColor('GREEN')
  message.channel.send(helpEmbed)
}

module.exports.config = {
    name: "help",
    description: "Gives a list of commands.",
    usage: "v!help",
    accessableby: "All Members",
    aliases: ['']
}
