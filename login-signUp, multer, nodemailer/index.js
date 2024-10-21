const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const cors = require("cors")
// const cookieParser = require('cookie-parser')
const userRouter = require("./routes/user");
dotenv.config();

const app = express()

//middleware
app.use(express.json())
app.use(cors())
// app.use(cookieParser())
app.use(express.static("./upload"))
app.use('/user', userRouter)


//database
connectDB()

//server
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server is listening on ${PORT}`)
})

