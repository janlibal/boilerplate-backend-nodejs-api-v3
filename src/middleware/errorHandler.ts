import { Next } from "koa"
import { IContext } from "../interfaces/IContext"
import logger from "../utils/logger"
import * as errors from '../utils/errors'
import config from "../config"




async function errorHandler(ctx: IContext, next: () => Promise<any>) {
    try {
 
       await next()
 
      } catch (error: any) {

        const stack = error.stack ? error.stack.split('\n') : error.stack
        
        const isDevelopment = ['development', 'test', 'staging', 'production'].includes(config.server.environment)

        ctx.status = error.status || 500
        ctx.body = { 
            requestId: ctx.state.id,
            status: error.status,
            type: error.type,
            message: error.message,
            stack: stack && stack.length > 2 ? `${stack[0]}  ${stack[1]}` : stack
        }
        
    }

}


async function oldErrorHandler(ctx: IContext, next: () => Promise<any>) {
    try {
        await next()
    } catch (error: any) {
        //let responseError = error
        
      /*if (!(error instanceof errors.InternalServerError)) {
        // This should never happen, log appropriately
        responseError = new errors.InternalServerError('aaa')
      }*/

      const isDevelopment = ['development', 'staging', 'production'].includes(config.server.environment)
      //console.log('isDevelopment ' + isDevelopment)
      //ctx.status = error.status || 500
      //error.status = responseError.status
      console.log('HERE SHOULD BE TYPE: ')
      ctx.body = {
          type: error.type || 'here should be type',
          message: error.message,
          stack: isDevelopment && error.stack,
        }
      //logger.warn('\nRequest Id: \n' + ctx.state.id +  '\n \nError message: \n' + error.message + '\n \nError stack: \n' +  error.stack)
      return true
    }
}


export default errorHandler

