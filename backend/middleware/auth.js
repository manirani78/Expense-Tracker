const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token;
  const authHeader = req.headers["authorization"];
  
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.slice(7, authHeader.length);
  }

  console.log("Token received:", token);

  if (!token) {
    console.log("No token provided!");
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("JWT verification failed:", err.message);
      return res.status(401).send({ message: "Unauthorized!" });
    }
    console.log("Token verified. User ID:", decoded.id);
    req.userId = decoded.id;
    next();
  });
};



module.exports = {verifyToken};
