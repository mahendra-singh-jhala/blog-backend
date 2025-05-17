const express = require("express")
const blogController = require("../controller/blogController")
const { userSignin } = require("../middleware/authMiddleware")

const router = express.Router();

// This route handles POST requests for create blog
router.post("/", userSignin, blogController.createBlog)

// This route handles GET requests for get all blog
router.get("/", userSignin, blogController.getUserAllblog)

// This route handles GET requests for get user blog 
router.get("/blog", blogController.getFilterblog)

// This route handles PUT requests for update blog
router.put("/:id", userSignin, blogController.updateBlog)

// This route handles DELETE requests for delete blog
router.delete("/:id", userSignin, blogController.deleteBlog)

module.exports = router