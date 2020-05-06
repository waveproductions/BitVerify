require('dotenv')config();
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
      console.log("Couldn't find commands.");
      return;
    }
  
  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`✅|${f} is ready`);
    bot.commands.set(props.help.name, props);
  });
  
  });

//Prefix for commands
const PREFIX = 'v!';

bot.on('ready', () => {
  console.log('✅|Ready') +
  bot.user.setStatus("online"); 
  
  let statuses = [
   `v!help`,
   `with roles`,
  ];
  
  setInterval(function() {
      let status = statuses[Math.floor(Math.random() * statuses.length)];
      bot.user.setActivity(status, {type: "PLAYING"})
  }, 2000);

});

bot.on("message", async message => {
    //a little bit of data parsing/general checks
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    let content = message.content.split(" ");
    let command = content[0];
    let args = content.slice(1);
    let prefix = PREFIX;
  
  
    //checks if message contains a command and runs it
    let commandfile = bot.commands.get(command.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
  })

bot.login(process.env.token)
