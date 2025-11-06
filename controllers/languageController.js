const Language = require("../models/languageModel");

// ➕ Create
exports.createLanguage = async (req, res) => {
  try {
    const { code, name, nativeName, flag } = req.body;
    const existing = await Language.findOne({ code });
    if (existing) return res.status(400).json({ message: "Language already exists" });

    const lang = new Language({ code, name, nativeName, flag });
    await lang.save();
    res.status(201).json({ message: "Language added", data: lang });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📋 Read all
exports.getLanguages = async (req, res) => {
  try {
    const langs = await Language.find().sort({ createdAt: -1 });
    res.status(200).json(langs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✏️ Update
exports.updateLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const lang = await Language.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Language updated", data: lang });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ Delete
exports.deleteLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    await Language.findByIdAndDelete(id);
    res.status(200).json({ message: "Language deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
