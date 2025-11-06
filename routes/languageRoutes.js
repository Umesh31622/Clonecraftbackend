const express = require("express");
const router = express.Router();
const languageController = require("../controllers/languageController");

router.post("/", languageController.createLanguage);
router.get("/", languageController.getLanguages);
router.put("/:id", languageController.updateLanguage);
router.delete("/:id", languageController.deleteLanguage);

module.exports = router;
