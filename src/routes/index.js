import { Router } from 'express'
import paidas from './piadas'

const routes = Router()

routes.use('/paidas', paidas)

export default routes
