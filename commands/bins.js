const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  let helpEmbed = new Discord.MessageEmbed()
  .setTitle('Bins')
  .setDescription(`**Use these bins instead of pasting code snippets.**
  
  ➡️ [\`SourceBin\`](https://sourceb.in/)
  ➡️ [\`HasteBin\`](https://hasteb.in/)
  ➡️ [\`HateBin\`](https://hatebin.com/)
  ➡️ [\`Hastebin\`](https://hastebin.com/)
  ➡️ [\`PasteBin\`](https://pastebin.com/)`)
  .setFooter('I recommend SourceBin.')
  .setColor('GREEN')
  message.channel.send(helpEmbed)
}

module.exports.config = {
    name: "bins",
    description: "A list of bins that you can use instead of pasting code snippets.",
    usage: "v!bins",
    accessableby: "All Members",
    aliases: ['']
}
