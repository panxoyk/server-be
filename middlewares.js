import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import { jwtKey } from './config.js'

export const errorHandler = (err, _req, res, _next) => {
    const message = err.message
    console.error('ERROR:', message)
    res.status(500).json({ message })
}

export const tokenMiddleware = async (req, _res, next) => {
    try {
        const token = req.headers.token.split(' ')[1]
        const payload = jwt.verify(token, jwtKey.token)
        req.headers.login = payload
        next()
    } catch (error) {
        next(error)
    }
}

export const authMiddleware = (req, _res, next) => {
    try {
        const token = req.headers.auth.split(' ')[1]
        const payload = jwt.verify(token, jwtKey.auth)
        req.headers.session = payload
        next()
    } catch (error) {
        next(error)
    }
}

export const loginValidator = [
    body('email').exists().isEmail().notEmpty().isLength({ max: 50 }),
    body('password').exists().notEmpty().isLength({ max: 400 }),
    (req, _res, next) => {
        if(!validationResult(req).isEmpty()) {
            next(new Error('Invalid value(s)'))
            return
        }
        next()
    }
]

export const notFound = (_req, res, _next) => {
    const message = 'endpoint not found'
    console.log('ERROR:', message)
    res.status(404).json({ message })
}

export const logRequest = (req, _res, next) => {
    console.log('-----')
    console.log(req.method, req.url, 'at', new Date().toLocaleTimeString())
    next()
}

