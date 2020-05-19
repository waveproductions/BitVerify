const mongoose = require('mongoose');
const TimerSchema = new mongoose.Schema({
    MemberID: String,
    GuildID: String,
    Time: String
});

const MessageModel = module.exports = mongoose.model('Timer', TimerSchema);
