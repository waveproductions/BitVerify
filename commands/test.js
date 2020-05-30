const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    let cmd = bot.commands.filter(e => e.config.category === 'utility').map(e => `\`${e.config.name}\``)
    
    let embed = new Discord.MessageEmbed()
    .setDescription(`${cmd.join(", ")}`)
    message.channel.send(embed)
}

module.exports.config = {
    name: "test",
    description: "A test command.",
    usage: "v!test",
    accessableby: "All Members",
    category: "utility",
    cooldown: 2,
    aliases: ['']
}
