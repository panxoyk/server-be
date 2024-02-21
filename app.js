import express, { json } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { tokenMiddleware, authMiddleware, errorHandler, loginValidator } from './middlewares.js'
import { login, access } from './controllers/auth.controller.js'
import { getProfile } from './controllers/profile.controller.js'

const app = express()

app.use(cors())
app.use(json())
app.use(cookieParser())

app.route('/auth/access').post(access)
app.route('/auth/login').post([tokenMiddleware, loginValidator], login)
app.route('/profile').get([authMiddleware], getProfile)

app.use(errorHandler)

export default app