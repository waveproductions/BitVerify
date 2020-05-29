const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    const cmd = bot.commands.map(x => `\`${x.config.name}\``).filter(x => x.config.category === 'fun')
    let embed = new Discord.MessageEmbed()
    .setDescription(`${cmd.join(", ")}`)
}

module.exports.config = {
    name: "test",
    description: "test command.",
    usage: "v!test",
    accessableby: "All Members",
    category: "test",
    cooldown: 2,
    aliases: []
}
