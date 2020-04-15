const mongoose = require('mongoose');

const PiadaSchema = mongoose.Schema({
    joke: {
        type:String,
        required: true
    },
    response: String,
    category: Array,
});

module.exports = mongoose.model('Piadas', PiadaSchema);