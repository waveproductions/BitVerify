const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  if(message.author.id !== '515204641450098704') {
  return message.channel.send('You are not the owner.')
  } else {
    let embed = new Discord.MessageEmbed()
    .setTitle('Restart')
    .setDescription('Restarting in **10** seconds.')
    .setColor('BLUE')
    let embed2 = new Discord.MessageEmbed()
    .setTitle('Restart')
    .setDescription('The bot has finished restarting.')
    .setColor('BLUE')
  let msg = await message.channel.send(embed)
  setTimeout(function(){
          process.exit(143);
    msg.edit(embed2)
    bot.login(process.env.token)
        }, 10000)
  }
}

module.exports.config = {
    name: "restart",
    description: "Restarts the bot.",
    usage: "v!restart",
    accessableby: "Owner",
    aliases: ['']
}