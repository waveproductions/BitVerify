const reqEvent = (event) => require(`../events/${event}`)

module.exports = bot => {
    bot.on("ready", function() {reqEvent("ready") (bot) });
 }

module.exports = message => {
    bot.on("messageDelete", function() {reqEvent("messageDelete") (message) });
}
