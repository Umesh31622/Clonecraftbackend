const mongoose = require('mongoose');

const politicianTemplateSchema = new mongoose.Schema({
  politicianId: { type: String, required: true },
  templateTitle: { type: String, required: true },
  templateDescription: { type: String },
  templateImages: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PoliticianTemplate', politicianTemplateSchema);
