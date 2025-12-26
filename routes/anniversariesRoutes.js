const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

const controller = require('../controllers/anniversaryController');

router.get('/', controller.getBirthdays);

router.post('/', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'banner', maxCount: 1 }
]), controller.createBirthday);

router.put('/:id', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'banner', maxCount: 1 }
]), controller.updateBirthday);

router.delete('/:id', controller.deleteBirthday);

module.exports = router;
