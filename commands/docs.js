const request = require('request-promise')
module.exports.run = async (bot, message, args) => {
    if(!args[0]){             
        message.channel.send({embed:{
          color: 3223859,
          author:{name:`${message.author.tag}`,icon_url: message.author.displayAvatarURL()},
          description:('❌ Too few arguments given.'),
          fields:[{name:'Usage:',value:'\`\`\`docs <Project> <query>\`\`\`'},
      ],
      }})
}else{
    let queryString = (args[0])
    let docs = `https://djsdocs.sorta.moe/v2/embed?src=master&q=${queryString}`
    let response = await request(docs)
    var jsonembed = JSON.parse(response);
    message.channel.send({embed: jsonembed})

    function error (res, name, message) {
        const json = { status: res.statusCode, error: name }
        if (message) json.message = message
        res.json(json)
      }
      function notFound (res, message) {
        res.status(404)
        return error(res, 'Not Found', message)
      }
      function badRequest (res, message) {
        res.status(400)
        return error(res, 'Bad Request', message)
      }
}
}
module.exports.config = {
    name: "docs <discord.js docs>",
    description: "Gets information from the discord.js docs.",
    usage: "v!docs",
    aliases: []
}
