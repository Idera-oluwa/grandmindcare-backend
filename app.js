const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const registerRouter = require('./routes/register')
const applicantsRouter = require('./routes/applicants')
require('dotenv').config()
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
var cors = require('cors')

app.use(cors())
cloudinary.config({ 
    cloud_name: 'ddkmv4ol1', 
    api_key: '939852836874738', 
    api_secret: 'Fu5gSubkekfIIfMJ8_4iR_My_38' 
  });

//middlewares
app.use(express.json())
app.use(fileUpload());

//routes
app.use('/api/v1/grandmind/register',registerRouter)
app.use('/api/v1/grandmind/applicants',applicantsRouter)


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