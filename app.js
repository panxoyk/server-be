import express, { json } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { tokenMiddleware, authMiddleware, errorHandler, loginValidator, notFound, logRequest } from './middlewares.js'
import { login, access } from './controllers/auth.controller.js'
import { getProfile } from './controllers/profile.controller.js'

const app = express()

app.use(cors())
app.use(json())
app.use(cookieParser())

app.use(logRequest)

app.post('/auth/access', access)
app.post('/auth/login', [tokenMiddleware, loginValidator], login)
app.get('/profile', [authMiddleware], getProfile)

app.use(notFound)
app.use(errorHandler)

export default app