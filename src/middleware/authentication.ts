import { Next } from "koa"
import { IContext } from "../interfaces/IContext"
import userOperations from "../operations/userOperations"
import validate from "../validations"
import schema from '../validations/schemas/userSchema'
import * as errors from '../utils/errors'
import logger from "../utils/logger"






export async function authenticate(ctx:IContext, next:Next) {

  if (!ctx.header.authorization) {
    logger.info('No authorization defined')
    throw new Error('No authorization defined')
  }

  const jwtToken = ctx.header.authorization!
   
  ctx.state.userId = jwtToken

  return next()
}


