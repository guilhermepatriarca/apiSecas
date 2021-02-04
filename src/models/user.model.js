import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: 'Invalid Email address' })
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 7
  },
  role: {
    type: String,
    required: false,
    default: 'user'
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

userSchema.pre('save', async function (next) {
  // Hash the password before saving the user model
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

userSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this
  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_KEY)
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

export default mongoose.model('User', userSchema)
