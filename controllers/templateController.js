const Template = require('../models/Template');
const Category = require('../models/Category');

// GET all templates
exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.find().populate('category');
    res.json({ success: true, templates });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// CREATE template
exports.createTemplate = async (req, res) => {
  try {
    const { title, type, status, category } = req.body;
    const file = req.file ? `/uploads/${req.file.filename}` : undefined;

    const template = await Template.create({ title, type, status, category, file });
    const populated = await template.populate('category');
    res.json({ success: true, template: populated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE template
exports.updateTemplate = async (req, res) => {
  try {
    const { title, type, status, category } = req.body;
    const file = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updated = await Template.findByIdAndUpdate(
      req.params.id,
      { title, type, status, category, ...(file && { file }) },
      { new: true }
    ).populate('category');

    if(!updated) return res.status(404).json({ success: false, message: 'Template not found' });
    res.json({ success: true, template: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE template
exports.deleteTemplate = async (req, res) => {
  try {
    const deleted = await Template.findByIdAndDelete(req.params.id);
    if(!deleted) return res.status(404).json({ success: false, message: 'Template not found' });
    res.json({ success: true, message: 'Template deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
