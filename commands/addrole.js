const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    const newRole = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(role => role.name === args[0])
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0])
    if(!message.member.hasPermission('MANAGE_ROLES')) {
    return message.channel.send('You don\'t have permission to use this command.')
    }
    if(!newRole) {
    return message.channel.send('You did not specify a role.')
    }
    if(!member) {
    return message.channel.send('You did not specify a person.')
    }
    
    let embed = new Discord.MessageEmbed()
    .setTitle('Role Given')
    .setDescription(`You have given ${member} the ${newRole} role.`)
    .setColor('BLUE')
    message.channel.send(embed)
    member.roles.add(newRole)
}

module.exports.config = {
    name: "addrole",
    description: "Gives a member a role.",
    usage: "v!addrole <member> <role>",
    accessableby: "Admins",
    category: "utility",
    cooldown: 4,
    aliases: ['addr']
}
