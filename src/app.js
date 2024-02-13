import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { authMiddleware, errorMiddleware } from './middlewares.js'
import { login } from './controllers/auth.controller.js'
import { getProfile } from './controllers/profile.controller.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.route('/auth/login').post(login)

app.route('/profile').get(authMiddleware, getProfile)

app.use(errorMiddleware)

export default app