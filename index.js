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

//Prefix for commands
const PREFIX = 'v!';

bot.on("message", async message => {
    let prefix = PREFIX;
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    if(message.content.indexOf(prefix) !== 0) return;
    let content = message.content.split(" ");
    let command = content[0];
    let args = content.slice(1);
  
  
    //checks if message contains a command and runs it
    let commandfile = bot.commands.get(command.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
  })

bot.login(process.env.token)
