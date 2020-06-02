const Discord = require('discord.js');
const logChannel = require('../models/MessageLog');

module.exports = message => {
  logChannel.findOne({ GuildID: message.guild.id }, async (err, data12) => {
  if(!data12) return;
  if(message.author.bot) return;
  let messageChannel = bot.channels.cache.get(data12.MessageLogChannel)
  let messageDeleteEmbed = new Discord.MessageEmbed()
  .setAuthor('Message Deleted')
  .setDescription(`**User**\: <@${message.author.id}>
  **Channel**\: <#${message.channel.id}>

  ${message.content}`)
  .setColor('RED')
  .setFooter(`Message ID\: ${message.id}`)
  .setTimestamp()
  messageChannel.send(messageDeleteEmbed)
});
}
