const Religious = require("../models/religiousModel");
const cloudinary = require("../config/cloudinary");

// ✅ GET all religious entries
exports.getReligious = async (req, res) => {
  try {
    const religiousList = await Religious.find().sort({ createdAt: -1 });
    res.json({ success: true, religiousList });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ CREATE new religious entry
exports.createReligious = async (req, res) => {
  try {
    const { title, abbreviation, status } = req.body;
    if (!title || !abbreviation) {
      return res
        .status(400)
        .json({ success: false, message: "Title & Abbreviation required" });
    }

    let logoUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "religious",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
      });
      logoUrl = result.secure_url;
    }

    const religious = await Religious.create({
      title,
      abbreviation,
      status,
      logo: logoUrl,
    });

    res.json({ success: true, religious });
  } catch (err) {
    console.error("❌ Religious Create Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ UPDATE religious entry
exports.updateReligious = async (req, res) => {
  try {
    const { title, abbreviation, status } = req.body;
    if (!title || !abbreviation) {
      return res
        .status(400)
        .json({ success: false, message: "Title & Abbreviation required" });
    }

    let updateData = { title, abbreviation, status };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "religious",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
      });
      updateData.logo = result.secure_url;
    }

    const updated = await Religious.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Religious item not found" });

    res.json({ success: true, religious: updated });
  } catch (err) {
    console.error("❌ Religious Update Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ DELETE religious entry
exports.deleteReligious = async (req, res) => {
  try {
    const deleted = await Religious.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Religious item not found" });

    res.json({ success: true, message: "Religious deleted successfully" });
  } catch (err) {
    console.error("❌ Religious Delete Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
