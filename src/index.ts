import logger from "./utils/logger"

export async function helloWorld() {
    const data= 'Hello world!'
    logger.info('Message printed')
    return data
}

helloWorld()