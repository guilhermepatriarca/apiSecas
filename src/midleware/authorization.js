import jwt from 'jsonwebtoken'
import User from '../models/user.model'

export default (...roles) => {
  return async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '')
      const data = jwt.verify(token, process.env.JWT_KEY)
      const user = await User.findOne({ _id: data._id, 'tokens.token': token })
      if (user && roles.includes(user.role)) {
        next() // role is allowed, so continue on the next middleware
      } else {
        res.status(403).json({ message: 'Forbidden' })
      }
    } catch (e) {
      console.log(e)
    }
  }
}
