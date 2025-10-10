const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { getTemplates, createTemplate, updateTemplate, deleteTemplate } = require('../controllers/templateController');

router.get('/', getTemplates);
router.post('/', upload.single('file'), createTemplate);
router.put('/:id', upload.single('file'), updateTemplate);
router.delete('/:id', deleteTemplate);

module.exports = router;
