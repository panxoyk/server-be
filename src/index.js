import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Schema, model } from "mongoose"
import { connect } from 'mongoose'

const app = express()
const port = 3000

app.use(express.json())
app.use(cookieParser())
app.use(cors())

const error = (err, req, res, next) => {
    console.log('Error', err.message)
}

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

const auth = (req, res, next) => {
    try {
        const token = JSON.parse(req.headers.auth)
        const payload = jwt.verify(token, "holasecreto777")
        req.headers.session = payload
        next()
    } catch (error) {
        next(error)
    }
}

app.route('/profile')
    .get(auth, async (req, res, next) => {
        try {
            const { email } = req.headers.session
            if (!email) return
            const user = await UserModel.findOne({ email })
            res.json({ email: user.email })
        } catch (error) {
            next(error)
        }
    })

app.use(error)

app.listen(port, async () => {
    console.log(`Server running on port ${port}`)
    await connect('mongodb+srv://Francisco:Fach0018@cluster0.xqzrlqv.mongodb.net/server-be?retryWrites=true&w=majority')
    console.log('Connected to MongoDB')
})

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { collection: "users" })

UserSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const UserModel = model("User", UserSchema)