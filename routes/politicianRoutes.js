// // <<<<<<< HEAD
// // // const express = require("express");
// // // const router = express.Router();
// // // const multer = require("multer");
// // // const { CloudinaryStorage } = require("multer-storage-cloudinary");
// // // const cloudinary = require("../config/cloudinary");
// // // const {
// // //   getPoliticians,
// // //   createPolitician,
// // //   updatePolitician,
// // //   deletePolitician
// // // } = require("../controllers/politicianController");

// // // // Cloudinary storage
// // // const storage = new CloudinaryStorage({
// // //   cloudinary: cloudinary,
// // //   params: {
// // //     folder: "politicians",
// // //     allowed_formats: ["jpg","jpeg","png","webp"],
// // //   },
// // // });
// // // const upload = multer({ storage });

// // // // Routes
// // // router.get("/", getPoliticians);
// // // router.post("/", upload.single("logo"), createPolitician);
// // // router.put("/:id", upload.single("logo"), updatePolitician);
// // // router.delete("/:id", deletePolitician);

// // // module.exports = router;
// // const express = require("express");
// // const router = express.Router();
// // const multer = require("multer");
// // const { createPolitician, getPoliticians, updatePolitician, deletePolitician } = require("../controllers/politicianController");

// // const upload = multer({ dest: "uploads/" });

// // // CRUD Routes
// // router.post("/", upload.single("file"), createPolitician);
// // router.get("/", getPoliticians);
// // router.put("/:id", upload.single("file"), updatePolitician);
// // =======
// // const express = require("express");
// // const router = express.Router();
// // const multer = require("multer");
// // const { CloudinaryStorage } = require("multer-storage-cloudinary");
// // const cloudinary = require("../config/cloudinary");
// // const {
// //   getPoliticians,
// //   createPolitician,
// //   updatePolitician,
// //   deletePolitician
// // } = require("../controllers/politicianController");

// // // Cloudinary storage
// // const storage = new CloudinaryStorage({
// //   cloudinary: cloudinary,
// //   params: {
// //     folder: "politicians",
// //     allowed_formats: ["jpg","jpeg","png","webp"],
// //   },
// // });
// // const upload = multer({ storage });

// // // Routes
// // router.get("/", getPoliticians);
// // router.post("/", upload.single("logo"), createPolitician);
// // router.put("/:id", upload.single("logo"), updatePolitician);
// // >>>>>>> 81e715d1eeddd672021ea025730ba6c7d5f8447e
// // router.delete("/:id", deletePolitician);

// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");
// const {
//   getPoliticians,
//   createPolitician,
//   updatePolitician,
//   deletePolitician
// } = require("../controllers/politicianController");

// // Cloudinary storage
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "politicians",
//     allowed_formats: ["jpg", "jpeg", "png", "webp"],
//   },
// });
// const upload = multer({ storage });

// // CRUD Routes
// router.get("/", getPoliticians);
// router.post("/", upload.single("logo"), createPolitician);
// router.put("/:id", upload.single("logo"), updatePolitician);
// router.delete("/:id", deletePolitician);

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const {
  getPoliticians,
  createPolitician,
  updatePolitician,
  deletePolitician
} = require("../controllers/politicianController");

// Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "politicians",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

// CRUD Routes
router.get("/", getPoliticians);
router.post("/", upload.single("logo"), createPolitician);
router.put("/:id", upload.single("logo"), updatePolitician);
router.delete("/:id", deletePolitician);

module.exports = router;
