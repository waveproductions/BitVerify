const mongoose = require('mongoose');
const BotCountSchema = new mongoose.Schema({
    CountChannelID: String,
    GuildID: String,
});

const MessageModel = module.exports = mongoose.model('BotCount', BotCountSchema);
