const ms = require('ms')
const Levels = require('discord-xp')
const mongoose = require('mongoose')
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
const guildSettings = require('./models/GuildCreate');
const memberCount = require('./models/MemberCount');
const guildPrefix = require('./models/GuildPrefix');
const guildID = require('./models/GuildID');
const botCount = require('./models/BotCount');
const humanCount = require('./models/HumanCount')
const placeholder = require('./node_modules/discord-xp/models/levels.js')
const cookies = require('./models/Cookies')

Levels.setURL(process.env.dbURL)

mongoose.connect(process.env.dbURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true});

require("./util/eventHandler")(bot)

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.snipes = new Discord.Collection();
const cooldowns = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js") 
    if(jsfile.length <= 0) {
         return console.log("[LOGS] Couldn't Find Commands!");
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);  
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        });
    });
});

bot.on('messageDelete', async message => {
    if(message.author.bot) return;
	const snipes = message.client.snipes.get(message.channel.id) || [];
	snipes.unshift({
	content: message.content,
	author: message.author,
	image: message.attachments.first()
        ? message.attachments.first().proxyURL
        : null,
      date: new Date().toLocaleString("en-GB", {
        dataStyle: "full",
        timeStyle: "short",
      }),
    })
	snipes.splice(10)
	message.client.snipes.set(message.channel.id, snipes)
})

bot.on("message", async message => {
    guildPrefix.findOne({ GuildID: message.guild.id}, async(err, data10) => {
    let prefix = data10.prefix;
    if(message.author.bot || message.channel.type === "dm") return;
    if(message.content.indexOf(prefix) !== 0) return;
    
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(!commandfile) return;
        
        if(!cooldowns.has(commandfile.config.name)) {
        cooldowns.set(commandfile.config.name, new Discord.Collection())
        }
        
        const now = Date.now()
        const timestamps = cooldowns.get(commandfile.config.name)
        const cooldownAmount = (commandfile.config.cooldown || 3) * 1000;
        
        if(timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            
        if (now < expirationTime) {
		const timeLeft = (expirationTime - now) / 1000;
		let cooldownembed = new Discord.MessageEmbed()
		.setTitle('Cooldown')
		.setDescription(`This command is on a cooldown, try again in **${timeLeft.toFixed(1)} seconds.**
		The default cooldown on this command is \`${cooldownAmount / 1000}s\`.

		While you wait, join our [server](https://discord.com/invite/AgGxs45)!`)
		.setColor(0x983cc9)
		return message.channel.send(cooldownembed);
        }
	} else if(commandfile) commandfile.run(bot,message,args)
	    
	    timestamps.set(message.author.id, now);
setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    })
})

bot.on('message', async message => {
  const cookie = await cookies.findOne({ UserID: message.author.id, GuildID: message.guild.id })
  if(!cookie) {
  let newCookie = new cookies({
  UserID: message.author.id,
  GuildID: message.guild.id
  })
  newCookie.save()
  }
  if(!message.guild) return;
  if(message.author.bot) return;
    
  const randomCookie = Math.round(Math.random() * 1) + 1
  const randomXP = Math.floor(Math.random() * 19) + 1;
  const user = await Levels.fetch(message.author.id, message.guild.id);
  const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXP);
  if(hasLeveledUp) {
    if(randomCookie == '1') {
    const update = { UserID: message.author.id, GuildID: message.guild.id, Cookies: cookie.Cookies += 1 }
    let cookieupdate = await cookies.findOneAndReplace({ UserID: message.author.id, GuildID: message.guild.id }, update)
    let cookieembed = new Discord.MessageEmbed()
    .setTitle('Level Up!')
    .setDescription(`${message.author}, you are now level **${user.level}**! :tada: You also recieved a cookie! :cookie:`)
    .setColor('BLUE')
    let cookiemsg = await message.channel.send(cookieembed)
    setTimeout(function(){
          cookiemsg.delete();
    }, 5000)
    } else {
    let levelupembed = new Discord.MessageEmbed()
    .setTitle('Level Up!')
    .setDescription(`${message.author}, you are now level **${user.level}**! :tada:`)
    .setColor('BLUE')
    let msg = await message.channel.send(levelupembed);
    setTimeout(function(){
          msg.delete();
        }, 5000)
    }
    }
})

bot.on('channelDelete', channel => {
    humanCount.findOne({ GuildID: channel.guild.id }, async(err, data) => {
        if(!data) return;
        if(channel.id === data.HumanCountChannelID) {
            humanCount.deleteMany({ GuildID: channel.guild.id }, (err) => console.log(err))
        }
    })
})

bot.on('channelDelete', channel => {
    botCount.findOne({ GuildID: channel.guild.id }, async(err, data) => {
        if(!data) return;
        if(channel.id === data.BotCountChannelID) {
            botCount.deleteMany({ GuildID: channel.guild.id }, (err) => console.log(err))
        }
    })
})

bot.on('channelDelete', channel => {
    memberCount.findOne({ GuildID: channel.guild.id }, async(err, data) => {
        if(!data) return;
        if(channel.id === data.CountChannelID) {
            memberCount.deleteMany({ GuildID: channel.guild.id }, (err) => console.log(err))
        }
    })
})

//Member Count
bot.on('guildMemberAdd', member => {
    memberCount.findOne({ GuildID: member.guild.id}, async(err, data) => {
    if(!data) return;
    let count = bot.guilds.cache.get(data.GuildID)
    bot.channels.cache.get(data.CountChannelID).setName(`Members\: ${count.memberCount}`)
    })
})

//Member Count
bot.on('guildMemberRemove', member => {
    memberCount.findOne({ GuildID: member.guild.id}, async(err, data) => {
    if(!data) return;
    let count2 = bot.guilds.cache.get(data.GuildID)
    bot.channels.cache.get(data.CountChannelID).setName(`Members\: ${count2.memberCount}`)
    })
})

//Bot Count
bot.on('guildMemberAdd', member => {
    botCount.findOne({ GuildID: member.guild.id }, async(err, data) => {
    if(!data) return;
    let count3 = bot.guilds.cache.get(data.GuildID)
    bot.channels.cache.get(data.BotCountChannelID).setName(`Bots\: ${count3.members.cache.filter(member => member.user.bot).size}`)
    })
})

//Bot Count
bot.on('guildMemberRemove', member => {
    botCount.findOne({ GuildID: member.guild.id }, async(err, data) => {
    if(!data) return;
    let count4 = bot.guilds.cache.get(data.GuildID)
    bot.channels.cache.get(data.BotCountChannelID).setName(`Bots\: ${count4.members.cache.filter(member => member.user.bot).size}`)
    })
})

//Human Count
bot.on('guildMemberAdd', member => {
    humanCount.findOne({ GuildID: member.guild.id }, async(err, data) => {
    if(!data) return;
    let count5 = bot.guilds.cache.get(data.GuildID)
    bot.channels.cache.get(data.HumanCountChannelID).setName(`Humans\: ${count5.members.cache.filter(member => !member.user.bot).size}`)
    })
})

//Human Count
bot.on('guildMemberAdd', member => {
    humanCount.findOne({ GuildID: member.guild.id }, async(err, data) => {
    if(!data) return;
    let count6 = bot.guilds.cache.get(data.GuildID)
    bot.channels.cache.get(data.HumanCountChannelID).setName(`Humans\: ${count6.members.cache.filter(member => !member.user.bot).size}`)
    })
})

bot.on('guildMemberRemove', async member => {
Levels.deleteUser(member.id, member.guild.id);
})

bot.on('guildMemberRemove', async member => {
placeholder.deleteOne({ userID: member.id, guildID: member.guild.id }, (err) => console.log(err))
})

bot.on('guildCreate', guild => {
let newData = new guildPrefix({
    prefix: 'v!',
    GuildID: guild.id
})
newData.save()
})

bot.on('guildDelete', guild => {
    guildSettings.deleteOne({ GuildID: guild.id }, (err) => console.log(err))
    memberCount.deleteOne({ GuildID: guild.id }, (err) => console.log(err))
    guildPrefix.deleteOne({ GuildID: guild.id }, (err) => console.log(err))
    guildID.deleteOne({ GuildID: guild.id }, (err) => console.log(err))
    botCount.deleteOne({ GuildID: guild.id }, (err) => console.log(err))
    humanCount.deleteOne({ GuildID: guild.id }, (err) => console.log(err))
    placeholder.deleteMany({ GuildID: guild.id }, (err) => console.log(err))
    cookies.deleteMany({ GuildID: guild.id }, (err) => console.log(err))
    })

bot.login(process.env.token)
