
// const mongoose = require("mongoose");

// const categorySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   orientation: { type: String, enum: ["portrait", "landscape"], default: "portrait" },
//   filePath: { type: String, default: null }, // Cloudinary URL
//   status: { type: String, enum: ["active", "inactive"], default: "active" },
// }, { timestamps: true });

// module.exports = mongoose.model("Category", categorySchema);
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    orientation: { type: String, enum: ["portrait", "landscape"], default: "portrait" },
    filePath: { type: String, default: null },
    status: { type: String, enum: ["active", "inactive"], default: "active" },

    // New relations
    religious: { type: mongoose.Schema.Types.ObjectId, ref: "Religious", default: null },
    language: { type: mongoose.Schema.Types.ObjectId, ref: "Language", default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
