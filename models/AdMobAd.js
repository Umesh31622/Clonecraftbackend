const mongoose = require("mongoose");

const admobAdSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["banner", "interstitial", "rewarded"], required: true },

  // FIXED enum
  platform: { type: String, enum: ["android", "ios"], required: true },

  adUnitId: { type: String, required: true },

  status: { type: String, enum: ["active", "inactive"], default: "active" },
  impressions: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },

}, { timestamps: true });

module.exports = mongoose.model("AdMobAd", admobAdSchema);
