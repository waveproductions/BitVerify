const mongoose = require('mongoose');
const HumanCountSchema = new mongoose.Schema({
    HumanCountChannelID: String,
    GuildID: String,
});

const MessageModel = module.exports = mongoose.model('HumanCount', HumanCountSchema);
