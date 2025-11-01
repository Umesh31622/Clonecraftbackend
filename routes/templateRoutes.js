
// // const express = require("express");
// // const router = express.Router();
// // const multer = require("multer");
// // const { CloudinaryStorage } = require("multer-storage-cloudinary");
// // const cloudinary = require("../config/cloudinary");
// // const {
// //   getTemplates,
// //   createTemplate,
// //   updateTemplate,
// //   deleteTemplate,
// // } = require("../controllers/templateController");

// // // Cloudinary Storage
// // const storage = new CloudinaryStorage({
// //   cloudinary: cloudinary,
// //   params: async (req, file) => ({
// //     folder: "templates",
// //     resource_type: file.mimetype.includes("video") ? "video" : "image",
// //     allowed_formats: ["jpg","jpeg","png","webp","mp4","mov","mkv"],
// //   }),
// // });

// // const upload = multer({ storage });

// // router.get("/", getTemplates);
// // router.post("/", upload.single("file"), createTemplate);
// // router.put("/:id", upload.single("file"), updateTemplate);
// // router.delete("/:id", deleteTemplate);

// // module.exports = router;
// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary"); // your existing cloudinary config
// const {
//   getTemplates,
//   createTemplate,
//   updateTemplate,
//   deleteTemplate,
// } = require("../controllers/templateController");

// // Cloudinary Storage for multer-storage-cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: async (req, file) => {
//     // choose folder based on fieldname
//     const folder = file.fieldname === "frameFile" ? "templates/frames" : "templates/files";
//     return {
//       folder,
//       resource_type: file.mimetype.includes("video") ? "video" : "image",
//       allowed_formats: ["jpg","jpeg","png","webp","mp4","mov","mkv"],
//     };
//   },
// });

// const upload = multer({ storage });

// // Use fields to accept both main file and optional frameFile
// router.get("/", getTemplates);
// router.post("/", upload.fields([{ name: "file", maxCount: 1 }, { name: "frameFile", maxCount: 1 }]), createTemplate);
// router.put("/:id", upload.fields([{ name: "file", maxCount: 1 }, { name: "frameFile", maxCount: 1 }]), updateTemplate);
// router.delete("/:id", deleteTemplate);

// module.exports = router;
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const {
  addTemplate,
  getTemplates,
  updateTemplate,
  deleteTemplate,
} = require("../controllers/templateController");

// 🧩 Multer Cloudinary setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "templates",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "mp4"],
  },
});

const upload = multer({ storage });

// 🧩 Routes
router.post("/", upload.fields([{ name: "file" }, { name: "frameFile" }]), addTemplate);
router.get("/", getTemplates);
router.put("/:id", upload.fields([{ name: "file" }, { name: "frameFile" }]), updateTemplate);
router.delete("/:id", deleteTemplate);

module.exports = router;
