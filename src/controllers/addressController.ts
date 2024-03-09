import { IContext } from "../interfaces/IContext"

export async function address(ctx: IContext){

    const userId = ctx.state.userId

    const data = {
        userId: userId
    }

    ctx.status = 200
    ctx.body = data
    
}
