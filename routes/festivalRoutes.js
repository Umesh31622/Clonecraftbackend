// const router = require("express").Router();
// const upload = require("../middleware/upload");

// const {
//   getFestivals,
//   createFestival,
//   updateFestival,
//   deleteFestival
// } = require("../controllers/festivalController");

// router.get("/", getFestivals);
// router.post("/", upload.single("logo"), createFestival);
// router.put("/:id", upload.single("logo"), updateFestival);
// router.delete("/:id", deleteFestival);

// module.exports = router;


// const router = require("express").Router();
// const upload = require("../middleware/upload");
// const {
//   getFestivals,
//   createFestival,
//   updateFestival,
//   deleteFestival
// } = require("../controllers/festivalController");

// router.get("/", getFestivals);
// router.post("/", upload.single("logo"), createFestival);
// router.put("/:id", upload.single("logo"), updateFestival);
// router.delete("/:id", deleteFestival);

// module.exports = router;

const router = require("express").Router();
const upload = require("../middleware/upload");

const {
  getFestivals,
  createFestival,
  updateFestival,
  deleteFestival
} = require("../controllers/festivalController");

// ⭐ MULTIPLE UPLOADS (logo + banner)
const multiUpload = upload.fields([
  { name: "logo", maxCount: 1 },
  { name: "banner", maxCount: 1 }
]);

// 📌 GET Festivals
router.get("/", getFestivals);

// 📌 CREATE Festival (logo + banner allowed)
router.post("/", multiUpload, createFestival);

// 📌 UPDATE Festival (logo + banner allowed)
router.put("/:id", multiUpload, updateFestival);

// 📌 DELETE Festival
router.delete("/:id", deleteFestival);

module.exports = router;
