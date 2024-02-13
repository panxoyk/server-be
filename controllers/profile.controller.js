import { UserModel } from '../models/user.model.js'

export const getProfile = async (req, res, next) => {
    try {
        const { email } = req.headers.session
        const user = await UserModel.findOne({ email })
        res.json({ email: user.email })
    } catch (error) {
        next(error)
    }
}