const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    const snipes = bot.snipes.get(message.channel.id) || []
    const msg = snipes[args[0] - 1 || 0];
    if (!msg) return message.channel.send(`That snipe doesn't exist.`);
    const Embed = new MessageEmbed()
      .setAuthor(
        msg.author.tag,
        msg.author.displayAvatarURL({ dynamic: true, size: 256 })
      )
      .setDescription(msg.content)
      .setFooter(`Date: ${msg.date} | ${args[0] || 1}/${snipes.length}`);
    if (msg.attachment) Embed.setImage(msg.attachment);
    message.channel.send(Embed);
}

module.exports.config = {
    name: "snipe",
    description: "Gets the most recent deleted message.",
    usage: "v!snipe",
    accessableby: "All Members",
    category: "fun",
    cooldown: 2,
    aliases: []
}
