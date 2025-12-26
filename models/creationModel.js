// models/creationModel.js
const mongoose = require("mongoose");

const creationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // require if auth exists
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  fileUrl: { type: String, required: true },       // Cloudinary secure_url
  fileType: { type: String, enum: ["image", "video"], required: true },
  publicId: { type: String, required: true },      // Cloudinary public_id (for deletion)
  resourceType: { type: String, enum: ["image","video"], required: true }, // for cloudinary deletion
}, { timestamps: true });

module.exports = mongoose.model("Creation", creationSchema);
