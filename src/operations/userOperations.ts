import logger from "../utils/logger"
import { IUser } from "../interfaces/IUser"
import crypto from "../utils/crypto"
import * as errors from '../utils/errors'
import userRepository from "../repositories/userRepository"



async function create(input: IUser) {
    
    logger.info('create user started')

    const data = {
        email: input.email,
        name: input.name,
        password: await crypto.hashPassword(input.password),
    }

    const user = await userRepository.findByEmail(data.email)
        
    if (user) {
      logger.info('Resource already exists')
      throw new errors.ResourceAlreadyExists()
    }

    let createdUser: any
    createdUser = await userRepository.saveUser(data)
       
    const token = await crypto.generateAccessToken(createdUser.id)
            
    logger.info({user: createdUser, token: token}, 'create user finished')
            
    return {
        user: createdUser,
        token
    }
    
}


export default { 
    create
}