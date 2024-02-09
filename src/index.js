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

app.route('/')
    .get((req, res) => {
        res.send('Welcome to server')
    })

app.route('/login')
    .post(async (req, res) => {
        const { email, password } = JSON.parse(req.headers.login)
        const user = await UserModel.findOne({ email })
        if (!user) return
        const match = await bcrypt.compare(password, user.password)
        if (!match) return
        const session = jwt.sign({ email }, "holasecreto777")
        res.json({ session })
    })

app.route('/profile')
    .get(async (req, res) => {
        try {
            const token = JSON.parse(req.headers.auth)
            if (!token) return
            const payload = jwt.verify(token, "holasecreto777")
            if (!payload) return
            const user = await UserModel.findOne({ email: payload.email })
            res.json({ email: user.email })
        } catch (error) {
            console.log(error)
        }
    })

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