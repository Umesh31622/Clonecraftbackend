const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  platform: { type: String, enum: ["android", "ios"], required: true },

  banner: {
    enabled: { type: Boolean, default: false },
    adUnitId: { type: String, default: "" },
    position: { type: String, enum: ["top", "bottom"], default: "bottom" }
  },

  interstitial: {
    enabled: { type: Boolean, default: false },
    adUnitId: { type: String, default: "" },
    frequency: { type: Number, default: 3 }
  },

  rewarded: {
    enabled: { type: Boolean, default: false },
    adUnitId: { type: String, default: "" },
    rewardAmount: { type: Number, default: 10 }
  }

}, { timestamps: true });

module.exports = mongoose.model("AdMobSettings", settingsSchema);
