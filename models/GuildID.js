const mongoose = require('mongoose');
const idSchema = new mongoose.Schema({
    GuildID: String,
});

const MessageModel = module.exports = mongoose.model('GuildID', idSchema);
