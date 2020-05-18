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

mongoose.connect('mongodb+srv://bitverify:63asdfpee1@cluster0-opjfq.mongodb.net/Data',{
    useNewUrlParser: true,
    useUnifiedTopology: true});

require("./util/eventHandler")(bot)

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

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

bot.on("message", async message => {
    guildPrefix.findOne({ GuildID: message.guild.id}, async(err, data) => {
    let prefix = data.prefix;
    if(message.author.bot || message.channel.type === "dm") return;
    if(message.content.indexOf(prefix) !== 0) return;
    
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot,message,args)
    })
})

bot.on('channelDelete', channel => {
    memberCount.findOne({ GuildID: channel.guild.id}, async(err, data) => {
        if(!data) return;
        if(channel.id === data.CountChannelID) {
            memberCount.deleteOne({ GuildID: channel.guild.id }, (err) => console.log(err))
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

bot.on('guildCreate', guild => {
let newID = new guildID({
    GuildID: guild.id
})
newID.save()
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
    })

bot.login(process.env.token)
