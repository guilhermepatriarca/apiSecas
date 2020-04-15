const mongoose = require('mongoose');

const PiadaSchema = mongoose.Schema({
    joke: String,
    response: String,
    category: Array,
}, {
    timestamps: true
});

module.exports = mongoose.model('Piadas', PiadaSchema);