const express = require("express");
const router = express.Router();
const {
  addDownload,
  getDownloads,
  deleteDownload,
} = require("../controllers/downloadController");

router.post("/", addDownload);
router.get("/", getDownloads);
router.delete("/:id", deleteDownload);

module.exports = router;
