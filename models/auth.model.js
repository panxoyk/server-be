import { Schema, model } from "mongoose"

const AuthSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: 60,
        default: Date.now(),
    }
}, { collection: "auths" })

AuthSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export const AuthModel = model("Auth", AuthSchema)