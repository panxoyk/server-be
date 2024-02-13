import jwt from 'jsonwebtoken'
import { jwtKey } from './config.js'

export const errorMiddleware = (err, req, res, next) => {
    console.log('ERROR', err.message)
    res.status(500).json({ error: err.message })
}

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.auth
        const payload = jwt.verify(token, jwtKey)
        req.headers.session = payload
        next()
    } catch (error) {
        next(error)
    }
}