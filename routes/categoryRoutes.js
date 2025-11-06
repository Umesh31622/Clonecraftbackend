// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");
// const Category = require("../models/categoryModel");

// // Cloudinary storage
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "categories",
//     allowed_formats: ["jpg", "jpeg", "png", "webp"],
//   },
// });

// const upload = multer({ storage });

// // Create category
// router.post("/", upload.single("file"), async (req, res) => {
//   try {
//     const { name, orientation, status } = req.body;
//     const filePath = req.file ? req.file.path : null;

//     const newCategory = new Category({ name, orientation, status, filePath });
//     await newCategory.save();
//     res.status(201).json(newCategory);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // Get all categories
// router.get("/", async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.json(categories);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // Update category
// router.put("/:id", upload.single("file"), async (req, res) => {
//   try {
//     const { name, orientation, status } = req.body;
//     const updateData = { name, orientation, status };

//     if (req.file) updateData.filePath = req.file.path;

//     const updated = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
//     if (!updated) return res.status(404).json({ message: "Category not found" });
//     res.json(updated);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // Delete category
// router.delete("/:id", async (req, res) => {
//   try {
//     const deleted = await Category.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: "Category not found" });
//     res.json({ message: "Category deleted successfully" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const Category = require("../models/categoryModel");

// Cloudinary setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "categories",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

// Create Category
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { name, orientation, status, religious, language } = req.body;
    const filePath = req.file ? req.file.path : null;

    const newCategory = new Category({
      name,
      orientation,
      status,
      filePath,
      religious: religious || null,
      language: language || null,
    });

    await newCategory.save();
    const populated = await newCategory.populate(["religious", "language"]);
    res.status(201).json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get All Categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find()
      .populate("religious")
      .populate("language");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Update
router.put("/:id", upload.single("file"), async (req, res) => {
  try {
    const { name, orientation, status, religious, language } = req.body;
    const updateData = { name, orientation, status, religious, language };

    if (req.file) updateData.filePath = req.file.path;

    const updated = await Category.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    })
      .populate("religious")
      .populate("language");

    if (!updated) return res.status(404).json({ message: "Category not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
