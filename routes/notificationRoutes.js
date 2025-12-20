// const express = require("express");
// const router = express.Router();
// const multer = require("multer");

// const {
//   createNotification,
//   getNotifications,
//   deleteNotification
// } = require("../controllers/notificationController");

// // Image Upload Setup
// const storage = multer.diskStorage({
//   destination: "uploads/notifications",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// const upload = multer({ storage });

// // Routes
// router.post("/add", upload.single("image"), createNotification);
// router.get("/list", getNotifications);
// router.delete("/delete/:id", deleteNotification);

// module.exports = router;


// const express = require("express");
// const router = express.Router();

// const upload = require("../middleware/upload");

// const {
//   createNotification,
//   getNotifications,
//   deleteNotification
// } = require("../controllers/notificationController");

// // Cloudinary upload
// router.post("/add", upload.single("image"), createNotification);
// router.get("/list", getNotifications);
// router.delete("/delete/:id", deleteNotification);

// module.exports = router;


const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");   // ⭐ Your cloudinary upload file

const {
  createNotification,
  getNotifications,
  updateNotification,
  deleteNotification
} = require("../controllers/notificationController");

// ============= CRUD Routes ==============

// CREATE Notification
router.post("/add", upload.single("image"), createNotification);

// READ Notifications List
router.get("/list", getNotifications);

// UPDATE Notification
router.put("/update/:id", upload.single("image"), updateNotification);

// DELETE Notification
router.delete("/delete/:id", deleteNotification);

module.exports = router;
