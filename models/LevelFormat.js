const mongoose = require('mongoose')

const levelSchema = new mongoose.Schema({
    GuildID: String,
    UserID: String,
    UserXP: Number,
    UserLevel: Number
});

const MessageModel = module.exports = mongoose.model('LevelFormat', levelSchema);
