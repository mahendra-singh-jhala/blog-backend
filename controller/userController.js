const User = require("../models/userModel");

// Controller function for get user by ID
exports.getUser = async (req, res) => {
    const userId = req.user.userId
    try {
        const user = await User.findOne({ _id: userId })
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        res.status(200).json({
            message: "User get successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error to get user. Please try again later',
            error: error.message,
        });
    }
}