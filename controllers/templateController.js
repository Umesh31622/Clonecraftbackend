const Template = require("../models/Template");
const Category = require("../models/categoryModel");

const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find().populate("category");
    res.json({ success: true, templates });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const createTemplate = async (req, res) => {
  try {
    const { title, type, status, category, profilePosition, transitionType } = req.body;
    const file = req.file ? `http://localhost:7000/uploads/${req.file.filename}` : null;

    const template = await Template.create({
      title,
      type,
      status,
      category,
      profilePosition,
      transitionType,
      file,
    });

    const populated = await template.populate("category");
    res.json({ success: true, template: populated });
  } catch (err) {
    console.error("❌ Add Template Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateTemplate = async (req, res) => {
  try {
    const { title, type, status, category, profilePosition, transitionType } = req.body;
    const file = req.file ? `http://localhost:7000/uploads/${req.file.filename}` : undefined;

    const updated = await Template.findByIdAndUpdate(
      req.params.id,
      { title, type, status, category, profilePosition, transitionType, ...(file && { file }) },
      { new: true }
    ).populate("category");

    if (!updated)
      return res.status(404).json({ success: false, message: "Template not found" });
    res.json({ success: true, template: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteTemplate = async (req, res) => {
  try {
    const deleted = await Template.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Template not found" });
    res.json({ success: true, message: "Template deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
};
