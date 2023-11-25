import { v4 as uuid } from "uuid" 

let users = []

const createNewUser = ({ name, email, password }) => {
    if (!name || !email || !password) return null
    
    const newUser = { id: uuid(), name, email, password }

    users.push(newUser)

    return newUser
}

const getUserById = (id) => {
    const user = users.find((user) => user.id === id)
    return user
}

const getUserByEmail = (email) => {
    const user = users.find((user) => user.email === email)
    return user
}

export const userModel = {
    create: createNewUser,
    findOne: getUserById,
    findByEmail: getUserByEmail
}