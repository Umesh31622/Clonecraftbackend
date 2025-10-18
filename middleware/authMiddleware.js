// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const protect = async (req, res, next) => {
//   let token = req.headers.authorization;

//   if (!token || !token.startsWith("Bearer ")) {
//     return res.status(401).json({ success: false, message: "Not authorized" });
//   }

//   token = token.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-otp -otpExpires");
//     if (!req.user) return res.status(404).json({ success: false, message: "User not found" });
//     next();
//   } catch (err) {
//     console.error("[authMiddleware] token error:", err);
//     return res.status(401).json({ success: false, message: "Token invalid or expired" });
//   }
// };

// module.exports = protect;
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// User/Auth protection
const protect = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) return res.status(401).json({ success: false, message: "Not authorized" });

  token = token.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-otp -otpExpires");
    if (!req.user) return res.status(404).json({ success: false, message: "User not found" });
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Token invalid or expired" });
  }
};

// Admin only access
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ success: false, message: "Access denied. Admins only." });
  next();
};

module.exports = { protect, adminOnly };
