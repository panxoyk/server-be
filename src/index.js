import { connect } from 'mongoose'
import app from './app'

const port = 3000

app.listen(port, async () => {
    console.log(`Server running on port ${port}`)
    await connect('mongodb+srv://Francisco:Fach0018@cluster0.xqzrlqv.mongodb.net/server-be?retryWrites=true&w=majority')
    console.log('Connected to MongoDB')
})