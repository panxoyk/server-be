import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import { jwtKey } from './config.js'

export const errorMiddleware = (err, _req, res, _next) => {
    console.log('ERROR:', err.message)
    res.status(500).json({ message: err.message })
}

export const authMiddleware = (req, _res, next) => {
    try {
        const tokenReq = req.headers.auth.split(' ')[1]
        const payload = jwt.verify(tokenReq, jwtKey.auth)
        req.headers.session = payload
        next()
    } catch (error) {
        next(error)
    }
}

export const tokenMiddleware = async (req, _res, next) => {
    try {
        const tokenReq = req.headers.token.split(' ')[1]
        const payload = jwt.verify(tokenReq, jwtKey.token)
        req.headers.login = payload
        next()
    } catch (error) {
        next(error)
    }
}

export const loginValidator = [
    body('email').exists().isEmail().notEmpty().isLength({ max: 50 }),
    body('password').exists().notEmpty().isLength({ max: 20 }),
    (req, _res, next) => {
        if(!validationResult(req).isEmpty()) {
            next(new Error('Invalid value(s)'))
            return
        }
        next()
    }
]