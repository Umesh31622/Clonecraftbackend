const express = require("express");
const router = express.Router();
const { getTemplatesByCategory, getTemplatesByPolitician } = require("../controllers/userTemplateController");

// Get templates by category
router.get("/category/:id", getTemplatesByCategory);

// Get templates by politician
router.get("/politician/:id", getTemplatesByPolitician);

module.exports = router;
