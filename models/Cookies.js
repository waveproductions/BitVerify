const mongoose = require('mongoose')
const CookieSchema = new mongoose.Schema({
    UserID: String,
    GuildID: String,
    Cookies: { type: Number, default: 0 }
});

const MessageModel = module.exports = mongoose.model('Cookies', CookieSchema);
