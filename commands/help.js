const Discord = require('discord.js')
const guildPrefix = require('../models/GuildPrefix')
const fs = require('fs')

module.exports.run = async (bot, message, args) => {
  fs.readdir("../commands/", (err, files) => {
    
  if(err) console.log(err)
    
  let jsfile = files.filter(f => f.split(".").pop() === "js") 
    if(jsfile.length <= 0) {
         return console.log("[LOGS] Couldn't Find Commands!");
    }
    
  let pull = require(`../commands/${jsfile}`);
    
  const commandlist = pull.map(x => `\`${pull.config.name}\``)
    
  const mainembed = new Discord.MessageEmbed()
  .setTitle('BitVerify Commands')
  .addField('All Commands', `${commandlist.join(", ")}`)
  .setColor('BLUE')
  if(!args[0]) {
  return message.channel.send(mainembed)
  }
  })
}

module.exports.config = {
    name: "help",
    description: "Gives a list of commands.",
    usage: "v!help",
    accessableby: "All Members",
    aliases: ['']
}
