const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const {
  createMyCreation,
  getAllMyCreations,
  getApprovedCreations,
  updateStatus,
  deleteMyCreation,
} = require("../controllers/myCreationController");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: file.fieldname === "frameFile" ? "mycreations/frames" : "mycreations/files",
    resource_type: file.mimetype.includes("video") ? "video" : "image",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mov", "mkv"],
  }),
});

const upload = multer({ storage });

// Routes
router.post("/", upload.fields([{ name: "file" }, { name: "frameFile" }]), createMyCreation);
router.get("/", getAllMyCreations); // Admin panel
router.get("/approved", getApprovedCreations); // Public approved list
router.put("/:id/status", updateStatus); // Admin approve/reject
router.delete("/:id", deleteMyCreation);

module.exports = router;
