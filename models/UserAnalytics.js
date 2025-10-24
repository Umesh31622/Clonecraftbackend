const mongoose = require("mongoose");

const userAnalyticsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  downloads: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("UserAnalytics", userAnalyticsSchema);
