const jwt = require("jsonwebtoken");


// middleware to verify jwt token
 exports.protect = (req, res, next) => {
    const token = req.header.authorization && req.header.authorization.split(" ")[1];
     if (!token) {
         return res.status(401).json({ message: "Access denied. No token provided." });
     }

     try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         req.user = decoded;
         next();
     } catch (error) {
         return res.status(400).json({ message: "Invalid token." });
     }
 };

 //Check if user is logged in
const protect = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({
            message: "Access denied. No token provided."
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({
           message: "Invalid token."
        });
    }
};

// Check user's role
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                message: "Not authenticated."
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access denied. You do not have permission."
            });
        }

        next();
    };
};

module.exports = {
    protect,
    authorize
};