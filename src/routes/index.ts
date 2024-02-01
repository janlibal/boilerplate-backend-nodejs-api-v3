import Router from 'koa-router'
const router = new Router()
const test = new Router()

import testRoutes from './testRoutes'

test.use(testRoutes)

router.use('', test.routes())

  

export default router