const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getUserAnalytics,
  incrementDownloads,
  incrementShares
} = require("../controllers/userAnalyticsController");

// Get user analytics
router.get("/:userId", protect, getUserAnalytics);

// Increment downloads
router.post("/:userId/download", protect, incrementDownloads);

// Increment shares
router.post("/:userId/share", protect, incrementShares);

module.exports = router;
