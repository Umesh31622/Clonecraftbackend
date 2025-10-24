
// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const {
//   getTemplates,
//   createTemplate,
//   updateTemplate,
//   deleteTemplate,
// } = require("../controllers/templateController");

// // Multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
// });
// const upload = multer({ storage });

// router.get("/", getTemplates);
// router.post("/", upload.single("file"), createTemplate);
// router.put("/:id", upload.single("file"), updateTemplate);
// router.delete("/:id", deleteTemplate);

// module.exports = router;
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const {
  getTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
} = require("../controllers/templateController");

// Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: "templates",
    resource_type: file.mimetype.includes("video") ? "video" : "image",
    allowed_formats: ["jpg","jpeg","png","webp","mp4","mov","mkv"],
  }),
});

const upload = multer({ storage });

router.get("/", getTemplates);
router.post("/", upload.single("file"), createTemplate);
router.put("/:id", upload.single("file"), updateTemplate);
router.delete("/:id", deleteTemplate);

module.exports = router;
