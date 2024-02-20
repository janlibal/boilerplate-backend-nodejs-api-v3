import { Next } from "koa"
import { IContext } from "../interfaces/IContext"
import logger from "../utils/logger"
import * as errors from '../utils/errors'
import config from "../config"


async function errorHandler(ctx: IContext, next: () => Promise<any>) {
    try {
        await next()
    } catch (error: any) {
        ctx.status = error.status || 500
        ctx.body = {
            requestId: ctx.state.id,
            message: error.message
          }
        logger.warn('\nRequest Id: \n' + ctx.state.id +  '\n \nError message: \n' + error.message + '\n \nError stack: \n' +  error.stack)
    }
}


export default errorHandler

