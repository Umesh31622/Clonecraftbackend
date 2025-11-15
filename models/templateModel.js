

// // const mongoose = require("mongoose");

// // const TemplateSchema = new mongoose.Schema(
// //   {
// //     title: { type: String, required: true },
// //     type: { type: String, enum: ["video", "graphics"], default: "video" },
// //     status: { type: String, enum: ["active", "inactive"], default: "active" },

// //     // Parent refs
// //     category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
// //     politician: { type: mongoose.Schema.Types.ObjectId, ref: "Politician", default: null },
// //     religious: { type: mongoose.Schema.Types.ObjectId, ref: "Religious", default: null },

// //     // files (Cloudinary URLs)
// //     file: { type: String, default: null },
// //     filePublicId: { type: String, default: null },
// //     frameFile: { type: String, default: null },
// //     frameFilePublicId: { type: String, default: null },

// //     // UI related fields
// //     transitionPlacement: { type: String, enum: ["above", "below"], default: "below" },
// //     transitionType: {
// //       type: String,
// //       enum: [
// //         "fade","slideFromBottom","slideFromTop","slideFromLeft","slideFromRight",
// //         "scale","rotation","bounce","ripple","profileReveal"
// //       ],
// //       default: "fade"
// //     },
// //     profilePosition: {
// //       type: String,
// //       enum: [
// //         "topLeft","topRight","bottomLeft","bottomRight","center",
// //         "centerLeft","centerRight","topCenter","bottomCenter"
// //       ],
// //       default: "center"
// //     },
// //     orientation: { type: String, enum: ["landscape","portrait"], default: "landscape" },
// //     profileSize: { type: String, default: "" }, // like "300x300"
// //     profileShape: { type: String, enum: ["circle","square","rectangle"], default: "circle" },

// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("Template", TemplateSchema);

// const mongoose = require("mongoose");

// const TemplateSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     type: { type: String, enum: ["video", "graphics"], default: "video" },
//     status: { type: String, enum: ["active", "inactive"], default: "active" },

//     category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
//     politician: { type: mongoose.Schema.Types.ObjectId, ref: "Politician", default: null },
//     religious: { type: mongoose.Schema.Types.ObjectId, ref: "Religious", default: null },

//     file: { type: String, default: null },
//     filePublicId: { type: String, default: null },

//     frameFile: { type: String, default: null },
//     frameFilePublicId: { type: String, default: null },

//     transitionPlacement: { type: String, enum: ["above", "below"], default: "below" },

//     transitionType: {
//       type: String,
//       enum: [
//         "fade","slideFromBottom","slideFromTop","slideFromLeft","slideFromRight",
//         "scale","rotation","bounce","ripple","profileReveal"
//       ],
//       default: "fade"
//     },

//     profilePosition: {
//       type: String,
//       enum: [
//         "topLeft","topRight","bottomLeft","bottomRight","center",
//         "centerLeft","centerRight","topCenter","bottomCenter"
//       ],
//       default: "center"
//     },

//     orientation: { type: String, enum: ["landscape","portrait"], default: "landscape" },

//     profileSize: { type: String, default: "" },
//     profileShape: { type: String, enum: ["circle","square","rectangle"], default: "circle" },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Template", TemplateSchema);

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
  updateStatus,
  bulkDeleteTemplates,
  importTemplatesFromCsv
} = require("../controllers/templateController");

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: file.fieldname === "frameFile" ? "templates/frames" : "templates/files",
    resource_type: file.mimetype.includes("video") ? "video" : "image",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mov", "mkv"],
  }),
});

const upload = multer({ storage });

router.get("/", getTemplates);

router.post(
  "/",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "frameFile", maxCount: 1 }
  ]),
  createTemplate
);

router.put(
  "/:id",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "frameFile", maxCount: 1 }
  ]),
  updateTemplate
);

router.delete("/:id", deleteTemplate);

router.patch("/:id/status", updateStatus);

router.post("/bulk-delete", bulkDeleteTemplates);

router.post("/import-csv", importTemplatesFromCsv);

module.exports = router;
