import jwt from 'jsonwebtoken'
import { jwtKey } from './config.js'
import { AuthModel } from './models/auth.model.js'

export const errorMiddleware = (err, req, res, next) => {
    console.log('ERROR', err.message)
    res.status(500).json({ message: err.message })
}

export const authMiddleware = (req, res, next) => {
    try {
        const authReq = req.headers.auth
        const payload = jwt.verify(authReq, jwtKey.auth)
        req.headers.session = payload
        next()
    } catch (error) {
        next(error)
    }
}

export const tokenMiddleware = async (req, res, next) => {
    try {
        const tokenReq = req.headers.token
        const { email } = jwt.verify(tokenReq, jwtKey.token)
        const auth = await AuthModel.findOne({ email })
        if (!(auth.token === tokenReq)) {
            next(new Error('User unauthenticated'))
            return
        }
        next()
    } catch (error) {
        next(error)
    }
}