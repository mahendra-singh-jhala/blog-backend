const express = require("express")
const userController = require("../controller/userController")
const { userSignin } = require("../middleware/authMiddleware")

const router = express.Router();

// This route handles GET requests for get user
router.get("/", userSignin, userController.getUser)

module.exports = router