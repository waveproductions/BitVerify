const Discord = require('discord.js')
const Levels = require('discord-xp')

module.exports.run = async (bot, message, args) => {
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" "))
let user = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author
let level = await Levels.fetch(user.id, message.guild.id)
let leveldisplay = ''
let xpdisplay = ''
if(!level){
  leveldisplay = '0'
  xpdisplay = '0'
} else {
  leveldisplay = `${level.level}`
  xpdisplay = `${level.xp}`
}
  let status = '';
  if (user.presence.status === 'dnd'){
    status = 'Do Not Disturb';
      } else if (user.presence.status === 'online'){
    status = 'Online';
      } else if (user.presence.status === 'offline'){
    status = 'Offline';
      } else if (user.presence.status === 'idle'){
    status = 'Idle';
      } else if (user.presence.status === 'transparent'){
    status = 'Transparent';
      }
const embed = new Discord.MessageEmbed()
.setTitle(`${user.username}'s Info`)
.addField('Username', `**${member.user.username}**${member.user.discriminator}`, true)
.addField('User ID', `**${member.id}**`, true)
.addField('Nickname', `**${user.nickname ? user.nickname : 'No Nickname'}**`)
.addField('Level', `**${leveldisplay}**`)
.addField('XP', `**${xpdisplay}**`)
.addField('Status', `**${status}**`)
.addField('Joined Discord', `**${user.createdAt.toLocaleDateString()}**`)
.addField('Joined Server', `**${member.joinedAt.toLocaleDateString()}**`)
.setThumbnail(user.displayAvatarURL())
.setFooter(user.username, user.displayAvatarURL())
.setColor('BLUE')
}

module.exports.config = {
    name: "userinfo",
    description: "Gets information of the mentioned member.",
    usage: "!userinfo <mention | id | name>",
    accessableby: "All Members",
    aliases: ['whois', 'user-info']
}
