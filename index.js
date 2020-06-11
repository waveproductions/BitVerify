const ms = require('ms');
const mongoose = require('mongoose');
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
const guildSettings = require('./models/GuildCreate');
const memberCount = require('./models/MemberCount');
const guildPrefix = require('./models/GuildPrefix');
const guildID = require('./models/GuildID');
const botCount = require('./models/BotCount');
const humanCount = require('./models/HumanCount');
const cookies = require('./models/Cookies');
const logChannel = require('./models/MessageLog');
const welcomeChannel = require('./models/WelcomeChannel');
const autorole = require('./models/Autorole');
const Canvas = require('canvas');

Canvas.registerFont('./otherfonts/Blacker-Sans-Extrabold-trial.ttf', { family: 'Blacker-Sans' })
Canvas.registerFont('./otherfonts/Comfortaa-Bold.ttf', { family: 'Comfortaa' })

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 50;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px Blacker-Sans`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 330);

	// Return the result to use in the actual canvas
	return ctx.font;
};

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

bot.on('messageDelete', async (message) => {
  logChannel.findOne({ GuildID: message.guild.id }, async (err, data12) => {
  if(!data12) return;
  if(message.author.bot) return;
  let messageChannel = bot.channels.cache.get(data12.MessageLogChannel)
  let messageDeleteEmbed = new Discord.MessageEmbed()
  .setAuthor('Message Deleted')
  .setDescription(`**User**\: <@${message.author.id}>
  **Channel**\: <#${message.channel.id}>

  ${message.content}`)
  .setColor('RED')
  .setFooter(`Message ID\: ${message.id}`)
  .setTimestamp()
  messageChannel.send(messageDeleteEmbed)
  });
});

bot.on('messageUpdate', async (oldMessage, newMessage) => {
  logChannel.findOne({ GuildID: oldMessage.guild.id }, async (err, data53) => {
  if(!data53) return;
  if(newMessage.author.bot) return;
  let messageChannel2 = bot.channels.cache.get(data53.MessageLogChannel)
  let messageUpdateEmbed = new Discord.MessageEmbed()
  .setAuthor('Message Edited')
  .setDescription(`**User**\: <@${oldMessage.author.id}>
  **Channel**\: <#${oldMessage.channel.id}>`)
  .addField('Before\:', `${oldMessage.content}`)
  .addField('After\:', `${newMessage.content}`)
  .setColor('YELLOW')
  .setFooter(`Message ID\: ${newMessage.id}`)
  .setTimestamp(newMessage.editedTimestamp)
  messageChannel2.send(messageUpdateEmbed)
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
    if (message.content.match(new RegExp(`^<@!?${bot.user.id}>( |)$`))) {
	return message.channel.send(`${message.guild.name}'s Prefix is \`${data10.prefix}\`\n\nSay \`${data10.prefix}help\` for a list of commands.`)
    }
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
		.setColor(0x3c54b4)
		return message.channel.send(cooldownembed);
        }
	} else if(commandfile) commandfile.run(bot,message,args)

	    timestamps.set(message.author.id, now);
setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    })
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

bot.on('guildMemberAdd', member => {
    welcomeChannel.findOne({ GuildID: member.guild.id }, async (err, data) => {
      if(!data) return;

      let randomWelcome = [
        `${member.user.username} has landed.`,
        `Everyone welcome ${member.user.username}!`,
        `${member.user.username} is here!`,
        `${member.user.username} finally came.`
      ]

      let randomWelcomes = randomWelcome[Math.floor(Math.random() * (randomWelcome.length))];

      let welcomechanneldata = bot.channels.cache.get(data.WelcomeChannelID)

      //-----------------------MAIN-----------------------
      const canvas = Canvas.createCanvas(850, 630);
      const ctx = canvas.getContext('2d');

      const background = await Canvas.loadImage('././image/profilebackground.PNG');
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, 10)

      ctx.fillStyle = "white";
      ctx.fillRect(0, canvas.height / 2 + 15, canvas.width, 5);

      ctx.fillStyle = "white";
      ctx.fillRect(0, canvas.height / 2 + 75, canvas.width, 5);

      //-----------------------TEXT-----------------------
      ctx.font = '30px Comfortaa';
      ctx.fillStyle = "white";
      ctx.fillText(`ID: ${member.id}`, 30, canvas.height / 2 + 115);

      ctx.font = '30px Comfortaa';
      ctx.fillStyle = "white";
      ctx.fillText(`Member: #${member.guild.memberCount}`, 30, canvas.height / 2 + 150);

      ctx.font = '30px Comfortaa';
      ctx.fillStyle = "white";
      ctx.fillText(`Server: ${member.guild.name}`, 30, canvas.height / 2 + 185);

      ctx.font = '30px Comfortaa';
      ctx.fillStyle = "white";
      ctx.fillText(`Time Joined: ${member.joinedAt.toLocaleString()}`, 30, canvas.height / 2 + 220);

      ctx.font = '30px Comfortaa';
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(randomWelcomes, canvas.width / 2, canvas.height / 2 + 60);

      ctx.font = applyText(canvas, member.user.tag);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(member.user.username, canvas.width / 2, canvas.height / 2);

      //-----------------------AVATAR-----------------------
      ctx.beginPath();
      ctx.arc(420, 190, 77, 0, Math.PI * 2, true);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(420, 190, 72, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();

      const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
      ctx.drawImage(avatar, 345, 115, 150, 150);

      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome.png');
      welcomechanneldata.send(attachment)
    })
})

bot.on('guildCreate', guild => {
let newData = new guildPrefix({
    prefix: 'v!',
    GuildID: guild.id
})
newData.save()
})

bot.on('guildMemberAdd', async member => {
  autorole.findOne({ GuildID: member.guild.id }, async (err, data432) => {
    if(!data432) return;
    let autorolerole = member.guild.roles.cache.get(data432.RoleID)
    member.roles.add(autorolerole)
  })
})

bot.on('guildDelete', guild => {
    guildSettings.deleteOne({ GuildID: guild.id }, (err) => console.log(err))
    memberCount.deleteOne({ GuildID: guild.id }, (err) => console.log(err))
    guildPrefix.deleteOne({ GuildID: guild.id }, (err) => console.log(err))
    guildID.deleteOne({ GuildID: guild.id }, (err) => console.log(err))
    botCount.deleteOne({ GuildID: guild.id }, (err) => console.log(err))
    humanCount.deleteOne({ GuildID: guild.id }, (err) => console.log(err))
    cookies.deleteMany({ GuildID: guild.id }, (err) => console.log(err))
    logChannel.deleteOne({ GuildID: guild.id }, (err) => console.log(err))
    welcomeChannel.deleteOne({ GuildID: guild.id }, (err) => console.log(err))
    autorole.deleteOne({ GuildID: guild.id }, (err) => console.log(err))
  });

bot.login(process.env.token)
