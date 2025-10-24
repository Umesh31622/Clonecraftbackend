const UserAnalytics = require("../models/UserAnalytics");

// Get analytics for a user
const getUserAnalytics = async (req, res) => {
  try {
    const { userId } = req.params;
    let analytics = await UserAnalytics.findOne({ userId });
    if (!analytics) {
      analytics = await UserAnalytics.create({ userId });
    }
    res.json({ success: true, data: analytics });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

// Increment downloads
const incrementDownloads = async (req, res) => {
  try {
    const { userId } = req.params;
    const analytics = await UserAnalytics.findOneAndUpdate(
      { userId },
      { $inc: { downloads: 1 } },
      { new: true, upsert: true }
    );
    res.json({ success: true, data: analytics });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

// Increment shares
const incrementShares = async (req, res) => {
  try {
    const { userId } = req.params;
    const analytics = await UserAnalytics.findOneAndUpdate(
      { userId },
      { $inc: { shares: 1 } },
      { new: true, upsert: true }
    );
    res.json({ success: true, data: analytics });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

module.exports = {
  getUserAnalytics,
  incrementDownloads,
  incrementShares
};
