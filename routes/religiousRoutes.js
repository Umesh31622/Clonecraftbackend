const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const {
  getReligious,
  createReligious,
  updateReligious,
  deleteReligious,
} = require("../controllers/religiousController");

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "religious",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});
const upload = multer({ storage });

// Routes
router.get("/", getReligious);
router.post("/", upload.single("logo"), createReligious);
router.put("/:id", upload.single("logo"), updateReligious);
router.delete("/:id", deleteReligious);

module.exports = router;
