  const Discord = require('discord.js');
  
  module.exports = bot => {
  console.log(`✅|${bot.user.username} is up and working`) +
  bot.user.setStatus("online"); 
  
  let statuses = [
   `v!help`,
   `with roles.`
  ];
  
  setInterval(function() {
      let status = statuses[Math.floor(Math.random() * statuses.length)];
      bot.user.bot.user.setActivity(status, {type: "PLAYING"});
  }, 2000);

};
