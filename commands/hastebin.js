const Discord = require('discord.js')
const hastebin = require('hastebin.js')

module.exports.run = async (bot, message, args) => {
if(message.deletable) {
message.delete()
}
  const haste = new hastebin({ url: 'hastebin.com' })
  
  const link = haste.post(args.slice(0).join(" "))
  
  message.channel.send(link)
}

module.exports.config = {
    name: "hastebin",
    description: "Makes the bot create a hastebin.",
    usage: "v!hastebin <code>",
    accessableby: "All Members",
    aliases: ['hb']
}
