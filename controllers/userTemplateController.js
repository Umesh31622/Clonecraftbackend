const Template = require("../models/templateModel");

// Get templates by category
exports.getTemplatesByCategory = async (req, res) => {
  try {
    const templates = await Template.find({ category: req.params.id })
      .populate("category")
      .populate("politician")
      .sort({ createdAt: -1 }); // latest first
    res.json({ success: true, templates });
  } catch (err) {
    console.error("❌ Error fetching templates by category:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get templates by politician
exports.getTemplatesByPolitician = async (req, res) => {
  try {
    const templates = await Template.find({ politician: req.params.id })
      .populate("category")
      .populate("politician")
      .sort({ createdAt: -1 });
    res.json({ success: true, templates });
  } catch (err) {
    console.error("❌ Error fetching templates by politician:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
