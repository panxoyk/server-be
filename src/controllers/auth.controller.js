import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/user.model.js'
import { jwtKey } from '../config.js'

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body //POSTMAN
        const user = await UserModel.findOne({ email })
        if (!user) {
            next(new Error('Invalid email or password'))
            return
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            next(new Error('Invalid email or password'))
            return
        }
        const session = jwt.sign({ email }, jwtKey, { expiresIn: 60 })
        res.json({ session })
    } catch (error) {
        next(error)
    }
}