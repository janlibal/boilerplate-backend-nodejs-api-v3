import  { User }  from "../database/models"
import { IUser } from "../interfaces/IUser"

async function findByEmail(email: string) {
    let user: any
    user = await User.query().where('email', email).first()
    return user
}

async function saveUser(attributes:IUser) {
    const user = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: attributes.email
    }

    return user
}

export default {
    saveUser,
    findByEmail
}