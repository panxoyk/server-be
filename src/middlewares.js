export const errorMiddleware = (err, req, res, next) => {
    console.log('Error', err.message)
}

export const authMiddleware = (req, res, next) => {
    try {
        const token = JSON.parse(req.headers.auth)
        const payload = jwt.verify(token, "holasecreto777")
        req.headers.session = payload
        next()
    } catch (error) {
        next(error)
    }
}