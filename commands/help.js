const Discord = require('discord.js')
const guildPrefix = require('../models/GuildPrefix')
const fs = require('fs')

module.exports.run = async (bot, message, args) => {
  fs.readdir("././commands/", (err, files) => {
    
  if(err) console.log(err)
    
  let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
  command = command.config
    
  const commandembed = new Discord.MessageEmbed()
  .setTitle('${command.name} Info')
  .addField('Name', `${command.name.toUpperCase}`)
  .addField('Description', `${command.description}`)
  .addField('Aliases', `${command.aliases.join(', ')}`)
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
