const Discord = require('discord.js')
const Levels = require('discord-xp')

module.exports.run = async (bot, message, args) => {
const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.
 
if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");
 
const leaderboard = Levels.computeLeaderboard(bot, rawLeaderboard); // We process the leaderboard.
 
const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.
 
message.channel.send(`**Leaderboard**:\n\n${lb.join("\n\n")}`);
}

module.exports.config = {
    name: "leaderboard",
    description: "The rank leaderboard of your server.",
    usage: "v!leaderboard",
    accessableby: "All Members",
    aliases: ['']
}
