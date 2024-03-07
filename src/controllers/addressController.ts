import { IContext } from "../interfaces/IContext"

export async function address(ctx: IContext){

    const data = {
        userId: 'eecb5585-68b7-470a-a344-f076b4dc4113'
    }

    ctx.status = 200
    ctx.body = data
    
}
