import { config } from "dotenv";

config()

export const port = process.env.PORT

export const jwtKey = process.env.JWT_KEY

export const mongo = {
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    db: process.env.MONGO_DB
}