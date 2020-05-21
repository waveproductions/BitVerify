const mongoose = require('mongoose');
const disableSchema = new mongoose.Schema({
    GuildID: String,
});

const MessageModel = module.exports = mongoose.model('DisableXP', disableSchema);
