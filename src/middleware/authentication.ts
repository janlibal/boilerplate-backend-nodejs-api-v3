import { Next } from "koa"
import { IContext } from "../interfaces/IContext"
import userOperations from "../operations/userOperations"
import validate from "../validations"
import schema from '../validations/schemas/userSchema'
import * as errors from '../utils/errors'
import logger from "../utils/logger"


async function parseHeader(hdrValue:string) {

  if (!hdrValue || typeof hdrValue !== 'string') {
    return null
  }

  const matches = hdrValue.match(/(\S+)\s+(\S+)/u)
    
  const data =  matches && {
    scheme: matches[0],
    value: matches[1],
  }

  return data
}




async function getAuthPayload(authorization:string) {
  
  const data = await parseHeader(authorization)
      
  return data
   
 }



export async function authenticate(ctx:IContext, next:Next) {

  if (!ctx.header.authorization) {
    logger.info('No authorization defined')
    throw new Error('No authorization defined')
  }

  const jwtToken = ctx.header.authorization!

  const data = await getAuthPayload(jwtToken)
  if (!data) {
    throw new errors.InvalidToken()
  }

   
  ctx.state.userId = jwtToken

  return next()
}


