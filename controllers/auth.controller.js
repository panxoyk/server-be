import jwt from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { UserModel } from '../models/user.model.js'
import { jwtKey } from '../config.js'

export const token = async (req, res, next) => {
    try {
        const { email } = req.body
        const token = jwt.sign({ email }, jwtKey.token, { expiresIn: 10 })
        res.json({ token })
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const emailAuth = req.headers.login.email
        const { email, password } = req.body
        if(!(emailAuth === email)) {
            next(new Error('User unauthorized'))
            return
        }
        const user = await UserModel.findOne({ email })
        if (!user) {
            next(new Error('Invalid email or password'))
            return
        }
        const match = await compare(password, user.password)
        if (!match) {
            next(new Error('Invalid email or password'))
            return
        }
        const session = jwt.sign({ email }, jwtKey.auth)
        res.json({ session })
    } catch (error) {
        next(error)
    }
}