const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { protect } = require("../middleware/authMiddleware");
const {
  getAllAnalytics,
  getUserAnalytics,
  createUserAnalytics,
  updateUserAnalytics,
  deleteUserAnalytics,
  incrementDownloads,
  incrementShares
} = require("../controllers/userAnalyticsController");

// 🔹 Admin: Get all analytics
router.get("/", protect, getAllAnalytics);

// 🔹 User-specific CRUD
router.get("/:userId", protect, getUserAnalytics);
router.post(
  "/:userId",
  protect,
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "frameFile", maxCount: 1 },
  ]),
  createUserAnalytics
);
router.put("/:id", protect, updateUserAnalytics);
router.delete("/:id", protect, deleteUserAnalytics);

// 🔹 Download/share count
router.post("/:userId/download", protect, incrementDownloads);
router.post("/:userId/share", protect, incrementShares);

module.exports = router;
