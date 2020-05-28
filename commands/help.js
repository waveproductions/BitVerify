const Discord = require('discord.js')
const guildPrefix = require('../models/GuildPrefix')
const fs = require('fs')

module.exports.run = async (bot, message, args) => {
  guildPrefix.findOne({ GuildID: message.guild.id }, async (err, data) => {
  fs.readdir("././commands/", (err, files) => {
    
  if(err) console.log(err)
  
  let cmd = bot.commands.map(c => `\`${c.config.name}\``)
  let fun = bot.commands.find(x => x.config.category === 'fun')
  let fun2 = `\`${fun.config.name}\``
  
  const mainembed = new Discord.MessageEmbed()
  .setTitle('BitVerify Commands')
  .addField('🎲 Fun', `\`${data.prefix}help fun\``, true)
  .addField('🛡️ Moderation', `\`${data.prefix}help moderation\``, true)
  .addField('🛠️ Utility', `\`${data.prefix}help utility\``, true)
  .setFooter(`Total Commands\: ${bot.commands.size} | Prefix\: ${data.prefix} | Say ${data.prefix}help <command> to get more info about the command.`)
  .setThumbnail(bot.user.displayAvatarURL())
  .setColor('BLUE')
  
  if(!args[0]) {
  return message.channel.send(mainembed)
  }
    
  if(args[0] === 'fun') {
  let funembed = new Discord.MessageEmbed()
  .setTitle('🎲 Fun Commands')
  .setDescription(`${fun2.join(", ")}`)
  .setFooter(`Total Commands\: ${bot.commands.size} | Prefix\: ${data.prefix} | Say ${data.prefix}help <command> to get more info about the command.`)
  .setColor('BLUE')
  return message.channel.send(funembed)
  }
    
    let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
    if(!command) {
    return message.channel.send('Couldn\'t find that command.')
    }
    
  const commandembed = new Discord.MessageEmbed()
  .setTitle(`${command.config.name.slice(0, 1).toUpperCase() + command.config.name.slice(1)} Info`)
  .addField('Name', `${command.config.name.slice(0, 1).toUpperCase() + command.config.name.slice(1)}`)
  .addField('Description', `${command.config.description}`)
  .addField('Category', `${command.config.category}`)
  .addField('Usage', `\`${command.config.usage}\``)
  .addField('Aliases', `${command.config.aliases.join(", ") ? command.config.aliases.join(", ") : 'None'}`)
  .addField('Accessible By', `${command.config.accessableby}`)
  .setFooter(`Total Commands\: ${bot.commands.size} | Prefix\: ${data.prefix}`)
  .setThumbnail(bot.user.displayAvatarURL())
  .setColor('BLUE')
  message.channel.send(commandembed)
  })
    })
}

module.exports.config = {
    name: "help",
    description: "Gives a list of commands.",
    usage: "v!help",
    accessableby: "All Members",
    category: "utility",
    aliases: ['']
}
