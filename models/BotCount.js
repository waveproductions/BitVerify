const mongoose = require('mongoose');
const BotCountSchema = new mongoose.Schema({
    BotCountChannelID: String,
    GuildID: String,
});

const MessageModel = module.exports = mongoose.model('BotCount', BotCountSchema);
