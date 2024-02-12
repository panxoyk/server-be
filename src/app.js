import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from './models/user.js'
import { authMiddleware, errorMiddleware } from './middlewares.js'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.route('/')
    .get((req, res) => {
        res.send('Welcome to server')
    })

app.route('/login')
    .post(async (req, res, next) => {
        try {
            const { email, password } = JSON.parse(req.headers.login)
            const user = await UserModel.findOne({ email })
            const match = await bcrypt.compare(password, user.password)
            if (!match) return
            const session = jwt.sign({ email }, "holasecreto777")
            res.json({ session })
        } catch (error) {
            next(error)
        }
    })

app.route('/profile')
    .get(authMiddleware, async (req, res, next) => {
        try {
            const { email } = req.headers.session
            if (!email) return
            const user = await UserModel.findOne({ email })
            res.json({ email: user.email })
        } catch (error) {
            next(error)
        }
    })

app.use(errorMiddleware)

export default app