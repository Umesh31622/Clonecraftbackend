// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/csv/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const csvUpload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     if (!file.originalname.match(/\.(csv)$/i)) {
//       return cb(new Error("Only CSV files allowed"), false);
//     }
//     cb(null, true);
//   },
// });

// module.exports = csvUpload;


const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Ensure uploads/csv folder exists
const uploadPath = path.join(__dirname, "../uploads/csv");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("📁 Created folder:", uploadPath);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const csvUpload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(csv)$/i)) {
      return cb(new Error("Only CSV files allowed"), false);
    }
    cb(null, true);
  },
});

module.exports = csvUpload;
