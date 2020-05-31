const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    const randomChoice = ["🗻", "📄", "✂️"]
    let startEmbed = new Discord.MessageEmbed()
    .setTitle('Rock Paper Scissors!')
    .setDescription('React with one of the emojis to play!')
    .setTimestamp()
    .setColor('RANDOM')
    let msg = await message.channel.send(startEmbed)
    await msg.react("🗻")
    await msg.react("📄")
    await msg.react("✂️")
    
    let botChoice = randomChoice[Math.floor(Math.random() * randomChoice.length)]
    
    let reactionFilter = (reaction, user) => (user.id === message.author.id) && !user.bot;
    let reaction = (await msg.awaitReactions(reactionFilter, { max: 1 })).first();
    
    let winning = ''
    
    if((reaction.emoji.name === '🗻' && botChoice === '✂️') ||
    (reaction.emoji.name === '📄' && botChoice === '🗻') ||
    (reaction.emoji.name === '✂️' && botChoice === '📄')) {
    winning = 'You won!'
    } else if(reaction.emoji.name === botChoice) {
    winning = 'It\'s a tie!'
    } else {
    winning = 'You lost.'
    }
    
    let newEmbed = new Discord.MessageEmbed()
    .setTitle('Rock Paper Scissors')
    .setDescription(`${reaction.emoji.name} vs ${botChoice}
    ${winning}`)
    .setColor('RANDOM')
    
    await msg.edit(newEmbed)
    await msg.reactions.removeAll()
}

module.exports.config = {
    name: "rps",
    description: "Rock paper scissors.",
    usage: "v!rps",
    accessableby: "All Members",
    category: "fun",
    cooldown: 3,
    aliases: []
}
