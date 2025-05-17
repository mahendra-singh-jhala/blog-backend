const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    blogImage: { 
        type: String, 
        default: "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg"
    }

}, { timestamps: true })

// create the blog modele
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;