const jwt = require("jsonwebtoken");
const UserModel = require("../models/usermodel")

const authMiddleware = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Token not found, please login again"
        });
    }

    const token = req.headers.authorization.split(" ")[1];

    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: "Invalid token" });
                }

                const userId = decoded.id; // Access the user ID from the decoded token
                const user = await UserModel.findById(userId);

                if (!user) {
                    return res.status(404).json({
                        message: "User not found"
                    });
                }

                req.user = user; // Attach the user object to the request
                console.log('User object:', req.user);
                next(); // Proceed to the next middleware
            });
        } catch (error) {
            return res.status(501).json({ message: "Error in auth" });
        }
    } else {
        return res.status(401).json({ message: "Token not provided" });
    }
};

module.exports = authMiddleware;
