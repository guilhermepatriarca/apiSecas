import mongoose from 'mongoose'

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

export default mongoose.model('Piadas', PiadaSchema)
