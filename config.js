import { config } from "dotenv";

config()

export const port = Number(process.env.PORT)

export const jwtKey = {
    token: process.env.TOKEN_KEY,
    auth: process.env.AUTH_KEY
}

export const authExpires = Number(process.env.KEY_EXP)

export const mongo = {
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    db: process.env.MONGO_DB
}