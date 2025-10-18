
// const Category = require("../models/categoryModel");

// // ✅ Add Category (upload image/video)
// const addCategory = async (req, res) => {
//   try {
//     console.log("📥 Incoming Data:", req.body);
//     console.log("📸 Uploaded File:", req.file);

//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const fileType = req.file.mimetype.startsWith("video") ? "video" : "image";

//     const category = new Category({
//       name: req.body.name,
//       type: req.body.type,
//       uploadType: req.body.uploadType,
//       orientation: req.body.orientation,
//       fileType,
//       filePath: `/uploads/${req.file.filename}`,
//       status: "Pending",
//     });

//     await category.save();
//     res.status(200).json({ success: true, category });
//   } catch (err) {
//     console.error("❌ Add Category Error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ Get All Categories
// const getAllCategories = async (req, res) => {
//   try {
//     const categories = await Category.find().sort({ createdAt: -1 });
//     res.status(200).json(categories);
//   } catch (err) {
//     console.error("❌ Get Categories Error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Update Category (can update name, file, type, status etc.)
// const updateCategory = async (req, res) => {
//   try {
//     const updateData = {
//       name: req.body.name,
//       type: req.body.type,
//       uploadType: req.body.uploadType,
//       orientation: req.body.orientation,
//       status: req.body.status,
//     };

//     if (req.file) {
//       const fileType = req.file.mimetype.startsWith("video") ? "video" : "image";
//       updateData.filePath = `/uploads/${req.file.filename}`;
//       updateData.fileType = fileType;
//     }

//     const updated = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
//     if (!updated) return res.status(404).json({ message: "Category not found" });

//     res.status(200).json({ success: true, category: updated });
//   } catch (err) {
//     console.error("❌ Update Category Error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✅ Update Category Status (Approve / Reject)
// const updateCategoryStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const updated = await Category.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );
//     if (!updated)
//       return res.status(404).json({ message: "Category not found" });
//     res.status(200).json(updated);
//   } catch (err) {
//     console.error("❌ Update Status Error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Delete Category
// const deleteCategory = async (req, res) => {
//   try {
//     const deleted = await Category.findByIdAndDelete(req.params.id);
//     if (!deleted)
//       return res.status(404).json({ message: "Category not found" });
//     res.status(200).json({ message: "Category deleted successfully" });
//   } catch (err) {
//     console.error("❌ Delete Error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = {
//   addCategory,
//   getAllCategories,
//   updateCategory,
//   updateCategoryStatus,
//   deleteCategory,
// };
const Category = require("../models/categoryModel");
const path = require("path");

// ✅ Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Create new category
exports.createCategory = async (req, res) => {
  try {
    const { name, orientation } = req.body;
    const filePath = req.file ? `/uploads/${req.file.filename}` : null;

    const category = await Category.create({ name, orientation, filePath });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update category
exports.updateCategory = async (req, res) => {
  try {
    const { name, orientation } = req.body;
    const filePath = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateData = { name, orientation };
    if (filePath) updateData.filePath = filePath;

    const updated = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: "Category not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
