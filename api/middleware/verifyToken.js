const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token.split(" ")[1], "your-secret-key", (err, decoded) => {
        if (err) {
            return res
                .status(403)
                .json({ message: "Failed to authenticate token" });
        }

        req.userId = decoded.userId;
        next();
    });
};

module.exports = verifyToken;
