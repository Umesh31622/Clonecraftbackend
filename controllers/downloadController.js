const Download = require("../models/Download");

// ✅ POST - Add a download record
exports.addDownload = async (req, res) => {
  try {
    const { userId } = req.body;
    const newData = await Download.create({ userId, ...req.body });

    res.status(201).json({
      success: true,
      data: newData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ GET - Get all downloads
exports.getDownloads = async (req, res) => {
  try {
    const downloads = await Download.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: downloads.length,
      data: downloads,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ DELETE - Delete a download by ID
exports.deleteDownload = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Download.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Download not found" });
    }
    res.status(200).json({ success: true, message: "Download deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
