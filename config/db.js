const mongoose = require("mongoose")

// Load enviornment variables
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected Successfully")
    } catch (error) {
        console.log("Error: MongoDB Not Connected", error)
    }
}

module.exports = connectDB