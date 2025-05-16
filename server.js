const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")

// Load enviornment variables
require("dotenv").config();

const app = express()

// connect to mongodb
connectDB();

// middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true 
}))


// Port
PORT = process.env.PORT || 5000

// start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})