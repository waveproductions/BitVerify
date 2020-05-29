const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  let helpEmbed = new Discord.MessageEmbed()
  .setTitle('Bins')
  .setDescription('This is a list of contributors.')
  .addField('Bot Owner', '\`Gavin Vu#5315\` [-](invite.gg/dashcraft) Main Creator of BitVerify')
  .addField('Others', '\`Poryafm12#6064\` [-](invite.gg/dashcraft) Command Handler\n\`Artist#3818\` [-](invite.gg/dashcraft) Inspiration And Encouragement\n\`Arize#6562\` [-](invite.gg/dashcraft) Commands`')
  .setColor('BLUE')
  .setFooter('The best people I have met.')
  message.channel.send(helpEmbed)
}

module.exports.config = {
    name: "contributors",
    description: "All the contributors that helped me on my journey.",
    usage: "v!contributors",
    accessableby: "All Members",
    category: "utility",
    cooldown: 2,
    aliases: ['contributor']
}