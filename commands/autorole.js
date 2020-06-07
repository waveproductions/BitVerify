const autorole = require('../models/Autorole')
const Discord = require('discord.js')
const mongoose = require('mongoose')

module.exports.run = async (bot, message, args) => {
  let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])

    if(!role) {
      return message.channel.send('You didn\'t specify a role!')
    }

    if(!message.member.hasPermission('ADMINISTRATOR')) {
      return message.channel.send('You don\'t have permission to use this command.')
    }

    autorole.findOne({ GuildID: message.guild.id }, async (err, data) => {
      if(err) console.log(err)
      if(!data) {
        let newRole = new autorole({
          GuildID: message.guild.id,
          RoleID: role.id
        })
        newRole.save()
        let success = new Discord.MessageEmbed()
        .setTitle('Data Created')
        .setDescription(`The role given on join will now be ${role.toString()}.`)
        .setColor('GREEN')
        message.channel.send(success)
      } else {
        let exists = new Discord.MessageEmbed()
        .setTitle('Data Already Exists')
        .setDescription('Please use the \`v!reset\` command to reset your data.')
        .setColor('RED')
        message.channel.send(exists)
      }
    })
}

module.exports.config = {
  name: "autorole",
  description: "Sets the autorole role.",
  usage: "v!autorole <role mention | role id>",
  accessableby: "Admins",
  category: "config",
  cooldown: 10,
  aliases: []
}
