const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ message: "Token is not valid" });

    // FIX: Check for 'id', 'userId', or '_id' to ensure we get the value
    req.userId = payload.id || payload.userId || payload._id;
    
    if (!req.userId) {
      return res.status(400).json({ message: "Invalid token payload: No ID found" });
    }

    next();
  });
};

module.exports = verifyToken;