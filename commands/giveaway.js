const Discord = require("discord.js");
const ms = require('ms')

module.exports.run = async (bot, message, args) => {

if(!message.member.hasPermission('ADMINISTRATOR', 'MANAGE_SERVER', 'KICK_MEMBERS', '')) {
return message.channel.send('You don\'t have permission to use this command!')
}

    let formatembed = new Discord.MessageEmbed()
    .setTitle('Incorrect Format')
    .setDescription(`\:x\: Make sure the format is correct!
    \`v!giveaway <s | m | h | d> <channel mention> <prize>\``)
    .setColor('RED')
if(!args[0]) {
    return message.channel.send(`You did not specify your time!`)
}
if(!args[0].endsWith("d")&&!args[0].endsWith("h")&&!args[0].endsWith("m")&&!args[0].endsWith("s")) {
    return message.channel.send(formatembed)
}
if(isNaN(args[0][0])) return message.channel.send(`That is not a number!`)
let channel = message.mentions.channels.first()
if(!channel) return message.channel.send(`I could not find that channel in the guild!`)
let prize = args.slice(2).join(" ")
if(!prize) return message.channel.send(`No prize specified!`)
    let createdembed = new Discord.MessageEmbed()
    .setTitle('Giveaway Created')
    .setDescription(`You have created a giveaway.`)
    .setColor('GREEN')
message.channel.send(createdembed)
let Embed = new Discord.MessageEmbed()
.setAuthor(prize)
.setDescription(`React with 🎉 to join!
Hosted by\: <@${message.author.id}>`)
.setFooter('Ends at')
.setTimestamp(Date.now()+ms(args[0]))
.setColor(`BLUE`)
let msg = await channel.send(Embed)
await msg.react("🎉")
setTimeout(() => {
    if(msg.reactions.cache.get("🎉").count<=1){
        let notenough = new Discord.MessageEmbed()
        .setAuthor('Not Enough Reactions')
        .setDescription('Nobody reacted!')
        .setColor(0x2f3136)
        return msg.edit(notenough)
    }
    
    let winner = msg.reactions.cache.get("🎉").users.cache.filter(u=>!u.bot).random()
    channel.send(`Congratulations ${winner}! You won the **${prize}**!`)

    let finished = new Discord.MessageEmbed()
    .setAuthor(prize)
    .setDescription(`Winner\: ${winner}
    Hosted by\: <@${message.author.id}>`)
    .setFooter('Ended at')
    .setTimestamp(Date.now())
    .setColor(0x2f3136)
    
    msg.edit(finished)
}, ms(args[0]));

}



module.exports.config = {
    name: "giveaway",
    description: "Starts a giveaway.",
    usage: "v!giveaway <s | m | h | d> <channel mention> <prize>",
    accessableby: "Admins",
    category: "fun",
    cooldown: 30,
    aliases: []
}
