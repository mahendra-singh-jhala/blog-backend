const jwt = require("jsonwebtoken");

// Middleware to verify JWT
exports.userSignin = (req, res, next) => {
    // Get the authorization header from the request
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            message: "Authorization header is missing"
        });
    }

    // Split the header to get the token
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            message: "Token is missing"
        });
    }

    try {
        const user = jwt.verify(token, process.env.SECRET_KEY); 
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
            error: error.message
        });
    }
};