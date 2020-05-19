const Discord = require('discord.js')
const ms = require('ms')
const colors = require('../stuff/colors.json')
const { Timers } = require('../variable')

module.exports.run = async(bot, message, args) => {
let formatembed = new Discord.MessageEmbed()
.setTitle('Incorrect Format')
.setDescription(`You did not use a proper format for the time.

\`v!timer <s | m | h | d\``)
.setColor(colors.green)

    if(!args[0]) {
    return message.channel.send('You did not specify a time!')
    }
    if(!args[0].endsWith("d")){
        if(!args[0].endsWith("h")){
            if(!args[0].endsWith("m")){
                if(!args[0].endsWith("s")){
                return message.channel.send(formatembed)
                }
            }
        }
    }
    if(isNaN(args[0][0])){
        return message.channel.send(`That is not a number!`)
    }
        Timers.set(message.author.id+" G "+message.guild.name,{
            Guild: message.guild.name,
            Author: {
                Tag:message.author.tag,
                ID:message.author.id
            },
            Time: ms(args[0])
        })
    message.channel.send(`${message.author.username}, you have set a timer for ${args[0]}.`)
    setTimeout(function(){
    let embed = new Discord.MessageEmbed()
    .setTitle('Timer Finished')
    .setDescription(`Your timer for ${args[0]} has finished!`)
    .setColor(colors.green)
    message.author.send(embed)
    Timers.delete(message.author.id+" G "+message.guild.name)
    }, ms(args[0]))
}

module.exports.config = {
    name: "timer",
    description: "A list of bins that you can use instead of pasting code snippets.",
    usage: "v!timer <s | m | h | d>",
    accessableby: "All Members",
    aliases: ['']
}
