import Router from 'koa-router'
const router = new Router()
const api = new Router()
const test = new Router()

import testRoutes from './testRoutes'
import userRoutes from './userRoutes'

test.use(testRoutes)
api.use(userRoutes)

router.use('', test.routes())
router.use('/api/v1', api.routes())

  

export default router