import validate from "../validations"
import schema from '../validations/schemas/userSchema'
import { IContext } from "../interfaces/IContext"
import { IUser } from "../interfaces/IUser"



export async function signUp(ctx: IContext){

    const input:IUser = {
        email: ctx.request.body.email,
        name: ctx.request.body.name,
        password: ctx.request.body.password
    }

    validate(schema.signUp, input)

    const user = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'fake.email@email.com',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    }
    
    ctx.body = {
        status: 'success',
        data: user
    }

}