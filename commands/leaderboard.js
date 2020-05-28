const Discord = require('discord.js')
const Levels = require('discord-xp')

module.exports.run = async (bot, message, args) => {
const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.
 
if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");
 
const leaderboard = Levels.computeLeaderboard(bot, rawLeaderboard); // We process the leaderboard.
 
const lb = leaderboard.map(e => `**${e.position}**. **${e.username}**#${e.discriminator} | Level: **${e.level}** | XP: **${e.xp.toLocaleString()}**`); // We map the outputs.

let embed = new Discord.MessageEmbed()
.setTitle(`${message.guild.name}'s Leaderboard`)
.setDescription(`${lb.join("\n\n")}`)
.setFooter(`${message.guild.name}`, message.guild.iconURL())
.setColor('BLUE')
.setThumbnail(message.guild.iconURL())
message.channel.send(embed);
}

module.exports.config = {
    name: "leaderboard",
    description: "The rank leaderboard of your server.",
    usage: "v!leaderboard",
    accessableby: "All Members",
    category: "utility",
    aliases: ['']
}
