const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  let helpEmbed = new Discord.MessageEmbed()
  .setTitle('Contributors')
  .setDescription('This is a list of contributors.')
  .addField('Bot Owner', '\`Gavin Vu#5315\` [-](https://github.com/gavserve/BitVerify/edit/master/commands/contributors.js) Main Creator of BitVerify')
  .addField('Others', '\`Poryafm12#6064\` [-](https://github.com/gavserve/BitVerify/edit/master/commands/contributors.js) Command Handler and his Big Brain\n\`Artist#3818\` [-](https://github.com/gavserve/BitVerify/edit/master/commands/contributors.js) Inspiration And Encouragement\n\`Arize#6562\` [-](https://github.com/gavserve/BitVerify/edit/master/commands/contributors.js) Commands\n\`Garden#5665\` [-](https://github.com/gavserve/BitVerify/edit/master/commands/contributors.js) Really Big Brain')
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
