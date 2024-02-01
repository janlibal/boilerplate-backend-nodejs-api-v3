import { IContext } from "../interfaces/IContext"
import logger from "../utils/logger"


async function errorHandler(ctx: IContext, next: () => Promise<any>) {
    try {
        await next()
    } catch (error: any) {
        ctx.status = error.status || 500
        ctx.body = {
            message: error.message
          }
        logger.warn('\nError message: \n' + error.message + '\n \nError stack: \n' +  error.stack)
    }
}


export default errorHandler
