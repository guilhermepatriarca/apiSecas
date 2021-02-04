import Router from 'express'
import piadas from './piadas'
import users from './users'

const routes = Router()

routes.use('/piadas', piadas)
routes.use('/users', users)

export default routes
