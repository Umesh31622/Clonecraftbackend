const mongoose = require("mongoose");

const politicianSchema = new mongoose.Schema({
  title: { type: String, required: true },
  abbreviation: { type: String, required: true },
  logo: { type: String, default: null }, // Cloudinary URL
  status: { type: String, enum: ["active", "inactive"], default: "active" },
}, { timestamps: true });

module.exports = mongoose.model("Politician", politicianSchema);
