import { IContext } from "../interfaces/IContext"
import { IUser } from "../interfaces/IUser"



export async function signUp(ctx: IContext){

    const input:IUser = {
        email: ctx.request.body.email,
        name: ctx.request.body.name,
        password: ctx.request.body.password
    }
    
    ctx.body = {
        status: 'success',
        data: input
    }

}