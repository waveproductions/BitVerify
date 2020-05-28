const Discord = require('discord.js')
const sourcebin = require('sourcebin')

module.exports.run = async (bot, message, args) => {
if(message.deletable) {
message.delete()
}
  sourcebin.create([
    {
        content: args.slice(0).join(" "),
        languageId: 'js'
    }
])
}

module.exports.config = {
    name: "sourcebin",
    description: "Makes the bot create a sourcebin.",
    usage: "v!sourcebin <code>",
    accessableby: "All Members",
    aliases: ['src']
}
