const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, enum: ['video','graphics','both'], default: 'both' },
  status: { type: String, enum: ['active','inactive'], default: 'active' },
  image: { type: String } // image/icon path
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);
