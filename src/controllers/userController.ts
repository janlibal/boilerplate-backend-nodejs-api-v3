import validate from "../validations"
import schema from '../validations/schemas/userSchema'
import { IContext } from "../interfaces/IContext"
import { IUser } from "../interfaces/IUser"
import userOperations from "../operations/userOperations"



export async function signUp(ctx: IContext){

    const input:IUser = {
        email: ctx.request.body.email,
        name: ctx.request.body.name,
        password: ctx.request.body.password
    }

    validate(schema.signUp, input)
    
    const user = await userOperations.create(input)
        
    ctx.body = {
        status: 'success',
        data: user
    }

   

}