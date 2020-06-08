  const Discord = require('discord.js');
  
  module.exports = bot => {
  console.log(`✅|${bot.user.username} is up and working`) +
  bot.user.setStatus("online"); 
  
  let statuses = [
   `v!help`,
   `roles move around.`,
    `${bot.guilds.cache.size} servers.`,
    `people joining and leaving.`,
    `Pory sleep.`
  ];
  
  setInterval(function() {
      let status = statuses[Math.floor(Math.random() * statuses.length)];
      bot.user.setActivity(status, {type: "WATCHING"});
  }, 12000);

};
