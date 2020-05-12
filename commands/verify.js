const Discord = require('discord.js')
const mongoose = require('mongoose')

module.exports.run = async (bot, message, args) => {
  const guildSettings = require('../models/GuildCreate')
  guildSettings.findOne({ GuildID: message.guild.id }, async(err, data) => {
  if(message.author.bot) return;
  if(message.channel.id === data.VerifyChannelID) {
  await message.delete().catch(err => console.log(err));
  let role = data.VerifiedRoleID
  if(role) {
      try {
        await message.member.roles.add(role);
        console.log('Role Added.')
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
    aliases: ['']
}
