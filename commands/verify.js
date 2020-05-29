const Discord = require('discord.js')
const mongoose = require('mongoose')

module.exports.run = async (bot, message, args) => {
  const guildSettings = require('../models/GuildCreate')
  guildSettings.findOne({ GuildID: message.guild.id }, async(err, data) => {
  if(!data) {
  return message.channel.send('Admins haven\'t set up the verify channel and role yet. Please contact the admins.')
  }
  if(message.author.bot) return;
  if(message.channel.id === data.VerifyChannelID) {
  await message.delete().catch(err => console.log(err));
  let role = data.VerifiedRoleID
  if(role) {
      try {
        await message.member.roles.add(role);
        }
        catch(err) {
        console.log(err)
        }
      }
    }
  })
}

module.exports.config = {
    name: "verify",
    description: "Verifies the user.",
    usage: "v!verify",
    accessableby: "All Members",
    category: "utility",
    cooldown: 1,
    aliases: ['']
}
