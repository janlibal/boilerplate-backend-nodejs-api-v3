import logger from "../utils/logger"
import { IUser } from "../interfaces/IUser"
import crypto from "../utils/crypto"
import * as errors from '../utils/errors'
import userRepository from "../repositories/userRepository"



async function login(input: IUser) {

    logger.info('login started')
  
    const data = {
        email: input.email.toLowerCase(),
        password: input.password
    }
      
    const user = await userRepository.findByEmail(data.email)
  
    if (!user) {
        logger.info('Unauthorized')
        throw new errors.UnauthorizedError('Invalid email or password')
        //throw new errors.Unauthorized('Invalid email or password')
    }
  
    const verified = await crypto.comparePasswords(data.password, user.password)
  
    if (!verified) {
        logger.info('Unauthorized')
        throw new errors.UnauthorizedError('Invalid email or password')
        //throw new errors.Unauthorized()
    }
  
    const token = await crypto.generateAccessToken(user.id)
    
  
    logger.info({email: user.email, token: token}, 'login finished')
  
    return {
        email: user.email,
        token
      }
    }

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
      throw new errors.ResourceAlreadyExistsNew('User already registered')
    }

    let createdUser: any
    createdUser = await userRepository.saveUser(data)
       
    const token = await crypto.generateAccessToken(createdUser.id)
            
    logger.info({email: createdUser.email, token: token}, 'create user finished')
            
    return {
        email: createdUser.email,
        token
    }
    
}


export default { 
    create,
    login
}