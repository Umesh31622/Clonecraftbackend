

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const {
//   addCategory,
//   getAllCategories,
//   updateCategory,
//   deleteCategory,
// } = require("../controllers/categoryController");

// // Multer Storage Config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
//   filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
// });
// const upload = multer({ storage });

// // Routes
// router.post("/", upload.single("file"), addCategory);  // Add new category
// router.get("/", getAllCategories);                     // Get all categories
// router.put("/:id", upload.single("file"), updateCategory); // Update category (file or data)
// router.delete("/:id", deleteCategory);                 // Delete category

// module.exports = router;
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// ✅ File upload setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Routes
router.get("/", getCategories);
router.post("/", upload.single("file"), createCategory);
router.put("/:id", upload.single("file"), updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
