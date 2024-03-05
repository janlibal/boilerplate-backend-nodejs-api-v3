import validate from "../validations"
import schema from '../validations/schemas/userSchema'
import { IContext } from "../interfaces/IContext"
import { IUser } from "../interfaces/IUser"
import userOperations from "../operations/userOperations"



export async function signIn(ctx: IContext){

    const input: IUser = {
        email: ctx.request.body.email,
        password: ctx.request.body.password
    }

    await validate(schema.signIn, input)

    const user = await userOperations.login(input)

    ctx.status = 200
    ctx.body = user

    /*ctx.body = {
        status: ctx.status,
        data: user,
    }*/

}



export async function signUp(ctx: IContext){

    const input:IUser = {
        email: ctx.request.body.email,
        name: ctx.request.body.name,
        password: ctx.request.body.password
    }

    await validate(schema.signUp, input)

    const user = await userOperations.create(input)


    ctx.status = 201
    ctx.body = user


    /*ctx.body = {
        status: 'success',
        data: user
    }*/

}