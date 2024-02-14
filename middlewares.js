import jwt from 'jsonwebtoken'
import { jwtKey } from './config.js'

export const errorMiddleware = (err, req, res, next) => {
    console.log('ERROR:', err.message)
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
        const payload = jwt.verify(tokenReq, jwtKey.token)
        req.headers.login = payload
        next()
    } catch (error) {
        next(error)
    }
}