const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const router = require('./routes/register')
require('dotenv').config()

//middlewares
app.use(express.json())

//routes
app.use('/api/v1/grandmind',router)


const port = process.env.PORT || 3000

const start = async() =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(3000,console.log(`server listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()