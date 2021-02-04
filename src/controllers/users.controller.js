import User from '../models/user.model'
import bcrypt from 'bcryptjs'

export const create = async (req, res) => {
  // Create a new user
  try {
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({
      role: user.role,
      password: user.password,
      name: user.name,
      email: user.email,
      token
    })
  } catch (error) {
    res.status(400).send('Erro ao criar user')
  }
}

export const login = async (req, res) => {
  // Login a registered user
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
    }
    const token = await user.generateAuthToken()
    res.status(200).send({
      token
    })
  } catch (error) {
    res.status(400).send(error)
  }
}

export const all = async (req, res) => {
  try {
    const users = await User.find()
    const info = users.map(user => {
      const { _id, role, name, email } = user
      return {
        role,
        name,
        email,
        id: _id
      }
    })
    res.status(201).send(info)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const logout = async (req, res) => {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send(error)
  }
}

export const changePremissions = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'I need a body'
    })
  }
  try {
    const res = await User.findByIdAndUpdate(req.params.id, {
      role: req.body.role,
      name: req.body.name,
      email: req.body.email
    }, { new: true })
    res.status(202).send(res)
  } catch (error) {
    res.status(500).send(error)
  }
}

export const remove = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({
      message: 'I need a ID'
    })
  }
  try {
    const res = await User.findByIdAndDelete(req.params.id)
    res.status(201).send({ message: 'User Remove Success' })
  } catch (error) {
    res.status(406).send({ message: 'Cannot remove user' })
  }
}
