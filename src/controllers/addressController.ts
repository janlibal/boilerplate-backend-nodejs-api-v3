import schema from '../validations/schemas/addressSchema'
import validate from '../validations'
import { IContext } from "../interfaces/IContext"

export async function address(ctx: IContext){

    const userId = ctx.state.userId

    const body = {
        firstName: ctx.request.body.firstName,
        lastName: ctx.request.body.lastName,
        phoneNo: ctx.request.body.phoneNo,
        address: ctx.request.body.address,
    }

    await validate(schema.address, body)

    const data = {
        userId: userId
    }

    ctx.status = 200
    ctx.body = data
    
}
