const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const authRouter = require("./router/authRoutes")
const userRouter = require("./router/userRoutes")
const blogRouter = require("./router/blogRoutes")

// Load enviornment variables
require("dotenv").config();

const app = express()

// connect to mongodb
connectDB();

// middleware
app.use(express.json());
app.use(cors({
    origin: 'https://new-blogs-write.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true 
}))

// routes
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/blogs", blogRouter)


// Port
PORT = process.env.PORT || 5000

// start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})