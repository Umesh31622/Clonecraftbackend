const Category = require('../models/Category');

// GET all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET single category
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if(!category) return res.status(404).json({ success: false, message: 'Category not found' });
    res.json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// CREATE category
exports.createCategory = async (req, res) => {
  try {
    const { name, type, status } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;
    const category = await Category.create({ name, type, status, image });
    res.json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE category
exports.updateCategory = async (req, res) => {
  try {
    const { name, type, status } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { name, type, status, ...(image && { image }) },
      { new: true }
    );
    if(!updated) return res.status(404).json({ success: false, message: 'Category not found' });
    res.json({ success: true, category: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE category
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if(!deleted) return res.status(404).json({ success: false, message: 'Category not found' });
    res.json({ success: true, message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
