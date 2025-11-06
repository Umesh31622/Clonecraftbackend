const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadCloudinary');
const { createTemplate, getTemplates, deleteTemplate } = require('../controllers/PoliticianTemplateController');

// Routes
router.post('/', upload.array('templateImages'), createTemplate);
router.get('/', getTemplates);
router.delete('/:id', deleteTemplate);

module.exports = router;
