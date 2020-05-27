const Discord = require('discord.js')
const guildPrefix = require('../models/GuildPrefix')
const fs = require('fs')

module.exports.run = async (bot, message, args) => {
  fs.readdir("././commands/", (err, files) => {
    
  if(err) console.log(err)
    
  let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
  command = command.config
  
    
  let cmd = bot.commands.map(x => x.name)
  
  const mainembed = new Discord.MessageEmbed()
  .setTitle('BitVerify Commands')
  .setDescription(`${cmd.join(", ")}`)
  .setColor('BLUE')
  
  if(!args[0]) {
  return message.channel.send(mainembed)
  }
    
  const commandembed = new Discord.MessageEmbed()
  .setTitle(`${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)} Info`)
  .addField('Name', `${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}`)
  .addField('Description', `${command.description}`)
  .addField('Aliases', `${command.aliases.join(", ") ? command.aliases.join(", ") : 'None'}`)
  .setColor('BLUE')
  message.channel.send(commandembed)
  })
}

module.exports.config = {
    name: "help",
    description: "Gives a list of commands.",
    usage: "v!help",
    accessableby: "All Members",
    aliases: ['']
}
