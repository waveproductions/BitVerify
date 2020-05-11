const mongoose = require('mongoose');
const guildCreateSchema = new mongoose.Schema({
    GuildID: String,
    VerifiedRoleID: String,
    VerifyChannelID: String,
});

const MessageModel = module.exports = mongoose.model('GuildCreate', guildCreateSchema);
