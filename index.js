import { connect } from 'mongoose'
import { port, mongo } from './config.js'
import app from './app.js'

app.listen(port, async () => {
    console.log(`Server running on port ${port}`)
    await connect(`mongodb+srv://${mongo.user}:${mongo.password}@cluster0.xqzrlqv.mongodb.net/${mongo.db}?retryWrites=true&w=majority`)
    console.log(`${mongo.user} is connected to MongoDB`)
})