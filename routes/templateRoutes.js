

// // // const express = require("express");
// // // const router = express.Router();
// // // const multer = require("multer");
// // // const { CloudinaryStorage } = require("multer-storage-cloudinary");
// // // const cloudinary = require("../config/cloudinary");

// // // const {
// // //   getTemplates,
// // //   createTemplate,
// // //   updateTemplate,
// // //   deleteTemplate,
// // //   updateStatus,
// // //   bulkDeleteTemplates,
// // //   importTemplatesFromCsv
// // // } = require("../controllers/templateController");

// // // // STORAGE
// // // const storage = new CloudinaryStorage({
// // //   cloudinary,
// // //   params: async (req, file) => ({
// // //     folder: file.fieldname === "frameFile" ? "templates/frames" : "templates/files",
// // //     resource_type: file.mimetype.includes("video") ? "video" : "image",
// // //     allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mov", "mkv"],
// // //   }),
// // // });

// // // const upload = multer({ storage });

// // // // ---------------------
// // // // CRUD
// // // // ---------------------
// // // router.get("/", getTemplates);

// // // router.post(
// // //   "/",
// // //   upload.fields([
// // //     { name: "file", maxCount: 1 },
// // //     { name: "frameFile", maxCount: 1 }
// // //   ]),
// // //   createTemplate
// // // );

// // // router.put(
// // //   "/:id",
// // //   upload.fields([
// // //     { name: "file", maxCount: 1 },
// // //     { name: "frameFile", maxCount: 1 }
// // //   ]),
// // //   updateTemplate
// // // );

// // // router.delete("/:id", deleteTemplate);

// // // // ---------------------
// // // // STATUS UPDATE
// // // // ---------------------
// // // router.patch("/:id/status", updateStatus);

// // // // ---------------------
// // // // BULK DELETE
// // // // ---------------------
// // // router.post("/bulk-delete", bulkDeleteTemplates);

// // // // ---------------------
// // // // CSV IMPORT (FIXED)
// // // // ---------------------
// // // router.post("/import-csv", importTemplatesFromCsv);

// // // module.exports = router;



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
// //   updateStatus,
// //   bulkDeleteTemplates,
// //   importTemplatesFromCsv
// // } = require("../controllers/templateController");

// // router.use(express.json({ limit: "50mb" }));

// // const storage = new CloudinaryStorage({
// //   cloudinary,
// //   params: async (req, file) => ({
// //     folder: file.fieldname === "frameFile" ? "templates/frames" : "templates/files",
// //     resource_type: file.mimetype.includes("video") ? "video" : "image"
// //   })
// // });

// // const upload = multer({ storage });

// // // ROUTES
// // router.get("/", getTemplates);
// // router.post("/", upload.fields([{ name: "file" }, { name: "frameFile" }]), createTemplate);
// // router.put("/:id", upload.fields([{ name: "file" }, { name: "frameFile" }]), updateTemplate);
// // router.delete("/:id", deleteTemplate);
// // router.patch("/:id/status", updateStatus);
// // router.post("/bulk-delete", bulkDeleteTemplates);
// // router.post("/import-csv", importTemplatesFromCsv);

// // module.exports = router;


// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const {
//   getTemplates,
//   createTemplate,
//   updateTemplate,
//   deleteTemplate,
//   updateStatus,
//   bulkDeleteTemplates,
//   importTemplatesFromCsv
// } = require("../controllers/templateController");

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: (req, file) => ({
//     folder: file.fieldname === "frameFile" ? "templates/frames" : "templates/files",
//     resource_type: file.mimetype.includes("video") ? "video" : "image",
//     allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mov", "mkv"],
//   }),
// });

// const upload = multer({ storage });

// router.get("/", getTemplates);

// router.post(
//   "/",
//   upload.fields([
//     { name: "file", maxCount: 1 },
//     { name: "frameFile", maxCount: 1 }
//   ]),
//   createTemplate
// );

// router.put(
//   "/:id",
//   upload.fields([
//     { name: "file", maxCount: 1 },
//     { name: "frameFile", maxCount: 1 }
//   ]),
//   updateTemplate
// );

// router.delete("/:id", deleteTemplate);

// router.patch("/:id/status", updateStatus);

// router.post("/bulk-delete", bulkDeleteTemplates);

// router.post("/import-csv", importTemplatesFromCsv);

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
  updateStatus,
  bulkDeleteTemplates,
  importTemplatesFromCsv
} = require("../controllers/templateController");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "templates",
    resource_type: "auto",
  }),
});

const upload = multer({ storage });

router.get("/", getTemplates);
router.post("/", upload.fields([{ name: "file" }, { name: "frameFile" }]), createTemplate);
router.put("/:id", upload.fields([{ name: "file" }, { name: "frameFile" }]), updateTemplate);
router.delete("/:id", deleteTemplate);
router.patch("/:id/status", updateStatus);
router.post("/bulk-delete", bulkDeleteTemplates);
router.post("/import-csv", importTemplatesFromCsv);

module.exports = router;
