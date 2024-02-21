import { Schema, model } from "mongoose"
import { authExpires } from "../config.js"

const KeySchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    privateKey: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: authExpires,
        default: Date.now(),
    }
}, { collection: "keys" })

KeySchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export const KeyModel = model("Key", KeySchema)