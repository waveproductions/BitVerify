const Discord = require("discord.js");
const {MessageEmbed} = require('discord.js');

module.exports.run = async (bot,message, args) => {
    let password = [
    'password',
    '12345678',
    'incorrect',
    'gayestofthemall',
    'gardenissmart',
    'gayestboi'
    ]
    let dm = [
    'i love artist',
    'eeeeee',
    'i Am really gay',
    'poryafm12 is hot',
    'i love gavin',
    'I hope no one saw me eat the cookies!',
    'wow that is small',
    'this bot sucks',
    'pepe',
    '-cries in spanish-'
    ]
    let domain =[
    'gmail.com',
    'yahoo.com',
    'msn.com',
    'hotmail.com'
    ]
    let email = [
    'isgay',
    'lovesArtist',
    'isanormie',
    'lovesPoryafm12',
    'isepic'
    ]
    let ip = ['153.213.177.72','2.17.161.149','165.17.130.81','78.144.220.112','101.105.148.246','40.57.65.227','67.136.197.20'
    ,'187.80.239.11','204.48.20.44','140.117.141.251','59.234.133.205','162.76.240.85','238.163.1.197','90.95.215.99','9.210.105.248',
    '65.141.50.205','134.200.165.134','175.82.24.222','135.29.155.155','88.252.102.8','202.184.208.213','206.153.130.128',
    '254.244.80.21','231.232.27.192','95.124.196.4','143.180.98.217','78.146.91.202','253.225.72.73','186.73.41.34',
    '132.43.253.11','174.139.18.109','120.103.113.6','161.212.8.160','92.82.87.93','198.16.47.17','161.134.222.23','131.161.184.131',
    '135.174.199.47','43.190.193.93','197.232.0.35','42.83.91.92','150.32.127.46','83.23.199.66','87.40.202.95',
    '207.201.23.91','46.178.184.136','135.229.100.182','149.33.185.59','131.168.67.104','34.29.88.113']
    let randomPassword = password[Math.floor(Math.random() * password.length)];
    let randomDM = dm[Math.floor(Math.random() * dm.length)];
    let randomIP = ip[Math.floor(Math.random()*ip.length)];
    let randomEmail = email[Math.floor(Math.random() * email.length)];
    let randomDomain = domain[Math.floor(Math.random() * domain.length)];
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0])
    if(!member){return message.channel.send('Woahh calm down, who do you want to hack?')}
    
    await message.channel.send(`Hacking ${member.user.username}...`).then(msg => {
        setTimeout(function(){
          msg.edit(`[▝] Finding ${member.user.username}'s IP.`);
        }, 750)
        setTimeout(function(){
        msg.edit(`[▗] Finding ${member.user.username}'s IP..`);
        }, 1500)
        setTimeout(function(){
        msg.edit(`[▖] Finding ${member.user.username}'s IP...`);
        }, 2250)
        setTimeout(function(){
        msg.edit(`[▘] Finding ${member.user.username}'s IP....`);
        }, 3000)
        setTimeout(function(){
        msg.edit(`[▝] Found IP...`);
        }, 4750)
        setTimeout(function(){
        msg.edit(`[▗] IP: ${randomIP}`);
        }, 6500)
        setTimeout(function(){
        msg.edit(`[▖] Hacking Discord account.`);
        }, 8250)
        setTimeout(function(){
        msg.edit(`[▘] Hacking Discord account..`);
        }, 10000)
        setTimeout(function(){
        msg.edit(`[▝] Hacking Discord account...`);
        }, 11750)
        setTimeout(function(){
        msg.edit(`[▗] Discord Account Details Found`);
        }, 13500)
        setTimeout(function(){
        msg.edit(`**Email**\: \`${member.user.username}${randomEmail}@${randomDomain}\`\n**Password**\: \`${randomPassword}\``);
        }, 15250)
        setTimeout(function(){
        msg.edit(`[▘] Finding latest DM...`);
        }, 17000)
        setTimeout(function(){
        msg.edit(`[▝] Latest DM\: ${randomDM}`);
        }, 18750)
        setTimeout(function(){
        msg.edit(`[▗] Injecting trojan virus into ${member.user.username}'s device`);
        }, 20500)
        setTimeout(function(){
        msg.edit(`[▖] Selling data to the government...`);
        }, 22250)
        setTimeout(function(){
        msg.edit(`[▘] Reporting Discord account for breaking the Discord ToS...`);
        }, 24000)
        setTimeout(function(){
        msg.edit(`Finished hacking ${member.user.username}.`);
        }, 25750)
        setTimeout(function(){
        message.channel.send(`The dangerous hack on ${member.user.username} is complete.`)
        }, 27500)
        })
}

module.exports.config = {
    name: "hack",
    description: "A fun command that hacks people.",
    usage: "v!hack",
    accessableby: "All Members",
    category: "fun",
    cooldown: 27.5,
    aliases: []
}
