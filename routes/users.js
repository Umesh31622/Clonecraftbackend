// const express = require("express");
// const router = express.Router();
// const { getUsers } = require("../controllers/userController");
// const { protect } = require("../middleware/authMiddleware");

// router.get("/", protect, getUsers);

// module.exports = router;
// ``
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { getUsers, getUserById, updateProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// multer memory storage (so we don't write to disk)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// List users
router.get("/", protect, getUsers);

// Get single user by id
router.get("/:id", protect, getUserById);

// Update profile of logged in user
// Accepts: multipart/form-data (avatar file) OR application/json (image as base64 in 'image')
router.put("/profile", protect, upload.single("avatar"), updateProfile);

module.exports = router;
