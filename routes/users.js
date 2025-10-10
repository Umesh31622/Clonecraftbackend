// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const { protect } = require("../middleware/authMiddleware");

// // Get all users (protected)
// router.get("/", protect, async (req, res) => {
//   try {
//     const users = await User.find().select("-otp -otpExpires");
//     return res.json({ success: true, users });
//   } catch (err) {
//     return res.status(500).json({ success: false, message: err.message });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const { getUsers } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

router.get("/", protect, getUsers);

module.exports = router;
