import jwt from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { AuthModel } from '../models/auth.model.js'
import { UserModel } from '../models/user.model.js'
import { jwtKey } from '../config.js'

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        if (!user) {
            await AuthModel.deleteOne({ email })
            next(new Error('Invalid email or password'))
            return
        }
        const match = await compare(password, user.password)
        if (!match) {
            await AuthModel.deleteOne({ email })
            next(new Error('Invalid email or password'))
            return
        }
        const session = jwt.sign({ email }, jwtKey.auth)
        res.json({ session })
    } catch (error) {
        next(error)
    }
}

export const token = async (req, res, next) => {
    try {
        const { email } = req.body
        const token = jwt.sign({ email }, jwtKey.token, { expiresIn: 60 })
        const auth = new AuthModel({ token, email })
        await auth.save()
        res.json({ token })
    } catch (error) {
        next(error)
    }
}