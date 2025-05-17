const User = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


// Controller function for user registration
exports.register = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const existingUser = await User.findOne({ email });
        // Check if the user name already exists
        if (existingUser) {
            return res.status(409).json({
                message: "User email already exists"
            });
        }

        // hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // register user
        const newUser = new User({
            name,
            email,
            password: hashPassword
        })

        await newUser.save();
        res.status(200).json({
            message: "User registered successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "User registered failed",
            error: error.message
        })
    }
}

// Controller function for user login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // match user email and password
        const user = await User.findOne({ email: email })
        if (!user) {
            res.status(400).json({
                message: "Email Not found"
            })
        }

        const matchPassword = await bcrypt.compare(password, user.password)
        if (!matchPassword) {
            return res.status(400).json({
                message: "Password Not Match"
            })
        }

        // if valid, generate the JWT token for the user
        const token = jwt.sign({ userId: user._id, email: user.email, name: user.name }, process.env.SECRET_KEY, { expiresIn: "7D" })

        // return the token user
        res.json({
            message: "Login Successfully",
            user: {
                userId: user._id,
                email: user.email,
                name: user.name
            },
            token
        })

    } catch (error) {
        res.status(500).json({
            message: "User Login Failed",
            error: error.message
        })
    }
}