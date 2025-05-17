const Blog = require("../models/blogModel");

// Controller function for creating a new Blog
exports.createBlog = async (req, res) => {
    const { title, content, category, blogImage } = req.body

    try {
        const newBlog = new Blog({
            title,
            content,
            category,
            author: req.user.name,
            userId: req.user.userId,
            blogImage
        });

        await newBlog.save();

        res.status(200).json({
            message: "Blog created successfully", 
            newBlog
        });
    } catch (error) {
        res.status(500).json({
            message: "Blog not created",
            error: error.message,
        });
    }
}


// Controller function for Get blog
exports.getUserAllblog = async (req, res) => {
    const userId = req.user.userId
    try {
        const blogs = await Blog.find({ userId: userId})
        if (!blogs) {
            return res.status(404).json({
                message: "Blog not found"
            })
        }

        res.status(200).json({
            blogs
        })
    } catch (error) {
        res.status(500).json({
            message: "Error fetching the Blog",
            error: error.message
        })
    }
}

// Controller function for Get All blog
exports.getFilterblog = async (req, res) => {
    const { category, author } = req.query

    const query = {};
    if (category) {
        query.category = category
    }
    if (author) {
        query.author = author
    }

    try {
        const blog = await Blog.find(query)
        res.status(200).json({
            blog
        })
    } catch (error) {
        res.status(500).json({
            message: "Error to fetching Filter Blog",
            error: error.message
        })
    }
}


// Controller function for update blog
exports.updateBlog = async (req, res) => {
    try {
        const updateblog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({
            message: "blog Updated Sucssesfully",
            updateblog
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error to updating blog. Please try again later',
            error: error.message
        })
    }
}

// Controller function for delete blog
exports.deleteBlog = async (req, res) => {
    try {
        const deleteBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deleteBlog) {
            return res.status(404).json({
                message: "Blog not found"
            })
        }
        res.status(200).json({
            message: "Blog delete successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error deleting the Blog",
            error: error.message
        })
    }
}