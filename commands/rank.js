const Discord = require('discord.js')
const Levels = require('discord-xp')

module.exports.run = async (bot, message, args) => {
const target = message.mentions.users.first() || bot.users.cache.get(args[0]) || bot.users.cache.get(x => x.user.username === args.slice(0).join(" ")) || message.author;

const user = await Levels.fetch(target.id, message.guild.id);

if (!user) return message.channel.send("This person hasn't gained any XP yet.");

let embed = new Discord.MessageEmbed()
.setTitle('Rank')
.setDescription(`<@${user.userID}>`)
.addField('Level', user.level, true)
.addField('XP', user.xp, true)
.setColor('BLUE')
.setTimestamp()
.setThumbnail(target.displayAvatarURL())
message.channel.send(embed);
}

module.exports.config = {
    name: "rank",
    description: "Gets the rank of the person mentioned.",
    usage: "v!rank <mention | id>",
    accessableby: "All Members",
    aliases: ['']
}
