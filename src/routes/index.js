import Router from 'express'
import piadas from './piadas'

const routes = Router()

routes.use('/piadas', piadas)

export default routes
