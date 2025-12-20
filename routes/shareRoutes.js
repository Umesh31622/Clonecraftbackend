const express = require("express");
const router = express.Router();
const {
  addShare,
  getShares,
  deleteShare,
} = require("../controllers/shareController");

router.post("/", addShare);
router.get("/", getShares);
router.delete("/:id", deleteShare);

module.exports = router;
