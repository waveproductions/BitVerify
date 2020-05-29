const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  let helpEmbed = new Discord.MessageEmbed()
  .setTitle('Bins')
  .setDescription(`**Use these bins instead of pasting code snippets.**
  
  ➡️ [__\`SourceBin\`__](https://sourceb.in/)
  ➡️ [__\`HasteBin\`__](https://hasteb.in/)
  ➡️ [__\`HateBin\`__](https://hatebin.com/)
  ➡️ [__\`Hastebin\`__](https://hastebin.com/)
  ➡️ [__\`PasteBin\`__](https://pastebin.com/)`)
  .setFooter('I recommend SourceBin.')
  .setColor('GREEN')
  message.channel.send(helpEmbed)
}

module.exports.config = {
    name: "bins",
    description: "A list of bins that you can use instead of pasting code snippets.",
    usage: "v!bins",
    accessableby: "All Members",
    category: "utility",
    cooldown: 4,
    aliases: ['']
}
