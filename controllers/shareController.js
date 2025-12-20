
const Share = require("../models/Share");

// ✅ POST - Add a share record
exports.addShare = async (req, res) => {
  try {
    const { userId } = req.body;
    const newData = await Share.create({ userId, ...req.body });

    res.status(201).json({
      success: true,
      data: newData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ GET - Get all shares
exports.getShares = async (req, res) => {
  try {
    const shares = await Share.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: shares.length,
      data: shares,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ DELETE - Delete a share by ID
exports.deleteShare = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Share.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Share not found" });
    }
    res.status(200).json({ success: true, message: "Share deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
