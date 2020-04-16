const mongoose = require('mongoose')

const PiadaSchema = mongoose.Schema({
  joke: {
    type: String,
    required: true
  },
  response: String,
  category: Array
}, {
  versionKey: false // You should be aware of the outcome after set to false
})

module.exports = mongoose.model('Piadas', PiadaSchema)
