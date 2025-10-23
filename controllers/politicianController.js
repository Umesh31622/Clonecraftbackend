const Politician = require("../models/politicianModel");
const cloudinary = require("../config/cloudinary");

// GET all politicians
exports.getPoliticians = async (req, res) => {
  try {
    const politicians = await Politician.find().sort({ createdAt: -1 });
    res.json({ success: true, politicians });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// CREATE politician
exports.createPolitician = async (req, res) => {
  try {
    const { title, abbreviation, status } = req.body;
    if (!title || !abbreviation) {
      return res.status(400).json({ success: false, message: "Title & Abbreviation required" });
    }

    let logoUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "politicians",
        allowed_formats: ["jpg","jpeg","png","webp"],
      });
      logoUrl = result.secure_url;
    }

    const politician = await Politician.create({ title, abbreviation, status, logo: logoUrl });
    res.json({ success: true, politician });
  } catch (err) {
    console.error("❌ Politician Create Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE politician
exports.updatePolitician = async (req, res) => {
  try {
    const { title, abbreviation, status } = req.body;
    if (!title || !abbreviation) {
      return res.status(400).json({ success: false, message: "Title & Abbreviation required" });
    }

    let updateData = { title, abbreviation, status };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "politicians",
        allowed_formats: ["jpg","jpeg","png","webp"],
      });
      updateData.logo = result.secure_url;
    }

    const updated = await Politician.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Politician not found" });

    res.json({ success: true, politician: updated });
  } catch (err) {
    console.error("❌ Politician Update Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE politician
exports.deletePolitician = async (req, res) => {
  try {
    const deleted = await Politician.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Politician not found" });
    res.json({ success: true, message: "Politician deleted successfully" });
  } catch (err) {
    console.error("❌ Politician Delete Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
