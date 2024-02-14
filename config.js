import { config } from "dotenv";

config()

export const port = process.env.PORT

export const jwtKey = {
    token: process.env.TOKEN_KEY,
    auth: process.env.AUTH_KEY
}

export const mongo = {
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    db: process.env.MONGO_DB
}