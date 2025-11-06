const UserAnalytics = require("../models/UserAnalytics");
const cloudinary = require("../config/cloudinary");

// 🔹 Get all analytics (Admin Panel)
exports.getAllAnalytics = async (req, res) => {
  try {
    const analytics = await UserAnalytics.find().populate("userId", "name email");
    res.json({ success: true, data: analytics });
  } catch (err) {
    console.error("❌ Error fetching all analytics:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 🔹 Get analytics for a specific user
exports.getUserAnalytics = async (req, res) => {
  try {
    const { userId } = req.params;
    const analytics = await UserAnalytics.find({ userId });
    res.json({ success: true, data: analytics });
  } catch (err) {
    console.error("❌ Error fetching user analytics:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 🔹 Create new analytics entry (with Cloudinary upload)
exports.createUserAnalytics = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      isProfile,
      category,
      transitionPlacement,
      transitionType,
      profilePosition,
      profileSize,
      profileShape,
      isImage
    } = req.body;

    let fileUrl = "";
    let frameFileUrl = "";

    // Upload file to Cloudinary (if available)
    if (req.files?.file?.[0]) {
      const uploadRes = await cloudinary.uploader.upload(req.files.file[0].path, {
        folder: "user_analytics/files",
      });
      fileUrl = uploadRes.secure_url;
    }

    // Upload frame file (if available)
    if (req.files?.frameFile?.[0]) {
      const frameRes = await cloudinary.uploader.upload(req.files.frameFile[0].path, {
        folder: "user_analytics/frames",
      });
      frameFileUrl = frameRes.secure_url;
    }

    const newAnalytics = await UserAnalytics.create({
      userId,
      creationData: {
        isProfile,
        category,
        file: fileUrl,
        frameFile: frameFileUrl,
        transitionPlacement,
        transitionType,
        profilePosition,
        profileSize,
        profileShape,
        isImage,
      },
    });

    res.status(201).json({ success: true, data: newAnalytics });
  } catch (err) {
    console.error("❌ Error creating analytics:", err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

// 🔹 Update existing analytics
exports.updateUserAnalytics = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await UserAnalytics.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("❌ Error updating analytics:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 🔹 Delete analytics
exports.deleteUserAnalytics = async (req, res) => {
  try {
    const { id } = req.params;
    await UserAnalytics.findByIdAndDelete(id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting analytics:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 🔹 Increment downloads count
exports.incrementDownloads = async (req, res) => {
  try {
    const { userId } = req.params;
    const updated = await UserAnalytics.findOneAndUpdate(
      { userId },
      { $inc: { downloads: 1 } },
      { new: true, upsert: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("❌ Error incrementing downloads:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 🔹 Increment shares count
exports.incrementShares = async (req, res) => {
  try {
    const { userId } = req.params;
    const updated = await UserAnalytics.findOneAndUpdate(
      { userId },
      { $inc: { shares: 1 } },
      { new: true, upsert: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("❌ Error incrementing shares:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
