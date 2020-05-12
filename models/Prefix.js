const mongoose = require('mongoose');

const PrefixSchema = new mongoose.Schema({
    GuildPrefix: { type: String, default: 'v!'}
});

const MessageModel = module.exports = mongoose.model('Prefix', PrefixSchema);
