// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");
// const {
//   createFrame,
//   getFrames,
//   updateFrame,
//   deleteFrame,
// } = require("../controllers/frameController");

// // ===== Cloudinary Multer Storage =====
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "frames",
//     allowed_formats: ["jpg", "jpeg", "png", "webp"],
//   },
// });

// const upload = multer({ storage });

// // ===== Routes =====
// router.post("/", upload.single("image"), createFrame);
// router.get("/", getFrames);
// router.put("/:id", upload.single("image"), updateFrame);
// router.delete("/:id", deleteFrame);

// module.exports = router;
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const {
  createFrame,
  getFrames,
  updateFrame,
  deleteFrame,
} = require("../controllers/frameController");

// ===== Cloudinary Multer Storage =====
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "frames",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

// ===== Routes =====
router.post("/", upload.single("image"), createFrame);
router.get("/", getFrames);
router.put("/:id", upload.single("image"), updateFrame);
router.delete("/:id", deleteFrame);

module.exports = router;
