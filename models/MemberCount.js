const mongoose = require('mongoose');
const MemberCountSchema = new mongoose.Schema({
    CountChannelID: String,
    GuildID: String,
});

const MessageModel = module.exports = mongoose.model('MemberCount', MemberCountSchema);
