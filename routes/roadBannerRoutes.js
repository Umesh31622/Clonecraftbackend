// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const {
//   getBanners,
//   createBanner,
//   updateBanner,
//   deleteBanner,
//   toggleStatus
// } = require("../controllers/roadBannerController");

// // Cloudinary storage
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "road-banners",
//     resource_type: "image"
//   }
// });

// const upload = multer({ storage });

// // Routes
// router.get("/", getBanners);
// router.post("/", upload.fields([{ name: "bannerImage", maxCount: 1 }]), createBanner);
// router.put("/:id", upload.fields([{ name: "bannerImage", maxCount: 1 }]), updateBanner);
// router.delete("/:id", deleteBanner);
// router.patch("/:id/status", toggleStatus);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const {
//   getBanners,
//   createBanner,
//   updateBanner,
//   deleteBanner,
//   toggleStatus
// } = require("../controllers/roadBannerController");

// // Cloudinary storage
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "road-banners",
//     resource_type: "image"
//   }
// });

// const upload = multer({ storage });

// // Routes
// router.get("/", getBanners);

// router.post(
//   "/",
//   upload.fields([{ name: "bannerImage", maxCount: 1 }]),
//   createBanner
// );

// router.put(
//   "/:id",
//   upload.fields([{ name: "bannerImage", maxCount: 1 }]),
//   updateBanner
// );

// router.delete("/:id", deleteBanner);

// router.patch("/:id/status", toggleStatus);

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const {
//   getBanners,
//   createBanner,
//   updateBanner,
//   deleteBanner,
//   toggleStatus
// } = require("../controllers/roadBannerController");

// // Cloudinary storage
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "road-banners",
//     resource_type: "image"
//   }
// });

// const upload = multer({ storage });

// // Routes
// router.get("/", getBanners);

// router.post(
//   "/",
//   upload.fields([
//     { name: "bannerImage", maxCount: 1 },
//     { name: "logoImage", maxCount: 1 }   // ⭐ NEW
//   ]),
//   createBanner
// );

// router.put(
//   "/:id",
//   upload.fields([
//     { name: "bannerImage", maxCount: 1 },
//     { name: "logoImage", maxCount: 1 }   // ⭐ NEW
//   ]),
//   updateBanner
// );

// router.delete("/:id", deleteBanner);

// router.patch("/:id/status", toggleStatus);

// module.exports = router;


const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  toggleStatus
} = require("../controllers/roadBannerController");

// Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "road-banners",
    resource_type: "image"
  }
});

const upload = multer({ storage });

// Routes
router.get("/", getBanners);

router.post(
  "/",
  upload.fields([
    { name: "bannerImage", maxCount: 1 },
    { name: "logoImage", maxCount: 1 }
  ]),
  createBanner
);

router.put(
  "/:id",
  upload.fields([
    { name: "bannerImage", maxCount: 1 },
    { name: "logoImage", maxCount: 1 }
  ]),
  updateBanner
);

router.delete("/:id", deleteBanner);

router.patch("/:id/status", toggleStatus);

module.exports = router;
