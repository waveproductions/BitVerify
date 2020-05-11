const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  let helpEmbed = new Discord.MessageEmbed()
  .setTitle('BitVerify Command List')
  .setDescription('\`verifychannel\`, \`verify\`, \`help\`, \`verifyinstructions\`, \`verifiedrole\`')
  .addField('\`verifychannel <mention channel here>\`', 'Makes the verify command only work in a specific channel.')
  .addField('\`verify\`', 'Verifies the user.')
  .addField('\`help\`', 'Sends this message!')
  .addField('\`verifyinstructions\`', 'Sends the instructions on how to setup this bot.')
  .addField('\`verifiedrole <mention role here>\`', 'Sets the verified role for your server.')
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
