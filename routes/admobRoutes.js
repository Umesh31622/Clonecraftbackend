const express = require("express");
const router = express.Router();

const {
  getSettings,
  saveSettings,
  getAds,
  getSingleAd,
  createAd,
  updateAd,
  deleteAd,
  toggleStatus,
} = require("../controllers/admobController");

// SETTINGS
router.get("/settings", getSettings);
router.post("/settings", saveSettings);

// CRUD
router.get("/ads", getAds);
router.get("/ads/:id", getSingleAd);
router.post("/ads", createAd);
router.put("/ads/:id", updateAd);
router.delete("/ads/:id", deleteAd);

// STATUS
router.patch("/ads/:id/status", toggleStatus);

module.exports = router;
