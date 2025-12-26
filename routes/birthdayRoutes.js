const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  getBirthdays,
  createBirthday,
  updateBirthday,
  deleteBirthday
} = require("../controllers/birthdayController");

router.get("/", getBirthdays);

router.post(
  "/",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "banner", maxCount: 1 }
  ]),
  createBirthday
);

router.put(
  "/:id",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "banner", maxCount: 1 }
  ]),
  updateBirthday
);

router.delete("/:id", deleteBirthday);

module.exports = router;
