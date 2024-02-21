import jwt from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { UserModel } from '../models/user.model.js'
import { KeyModel } from '../models/key.model.js'
import { jwtKey, authExpires } from '../config.js'
import { decryptPassword, generateKeys } from '../crypto.js'

export const access = async (req, res, next) => {
    try {
        const { email } = req.body
        const { publicKey: key, privateKey } = generateKeys()
        await KeyModel.findOneAndUpdate(
            { email },
            { email, privateKey },
            { upsert: true, new: true }
        )
        const token = jwt.sign(
            { email },
            jwtKey.token,
            { expiresIn: authExpires }
        ) // 60*5 -> 5 minutos
        res.json({ token, key })
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const emailAuth = req.headers.login.email
        const { email, password: passwordEncrypted } = req.body
        if(!(emailAuth === email)) {
            next(new Error('User unauthorized'))
            return
        }
        const keyModel = await KeyModel.findOne({ email })
        const password = decryptPassword(passwordEncrypted, keyModel.privateKey)
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
        const session = jwt.sign({ email }, jwtKey.auth, { expiresIn: 60*60*24*7 }) // 60*60*24*7 -> 1 semana
        res.json({ session })
    } catch (error) {
        next(error)
    }
}