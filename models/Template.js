const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['video','graphics'], required: true },
  status: { type: String, enum: ['active','inactive'], default: 'active' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  file: { type: String }, // image/video URL
}, { timestamps: true });

module.exports = mongoose.model('Template', TemplateSchema);
