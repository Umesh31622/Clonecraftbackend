
// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: { type: String, default: "New User" },
//   email: { type: String, required: true, unique: true },
//   password: { type: String },
//   role: { type: String, enum: ["user", "admin"], default: "user" },
//   status: { type: String, enum: ["active", "inactive"], default: "inactive" },
//   otp: { type: String },
//   otpExpires: { type: Date },
// }, { timestamps: true });

// module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, default: "New User" },
  userTag: { type: String, default: "", index: true }, // like @username
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  status: { type: String, enum: ["active", "inactive"], default: "inactive" },
  otp: { type: String },
  otpExpires: { type: Date },

  // PROFILE FIELDS
  avatarUrl: { type: String, default: "" }, // Cloudinary secure_url
  bio: { type: String, default: "" },
  premium: { type: Boolean, default: false },

  // simple stats for UI
  stats: {
    createdCount: { type: Number, default: 0 },
    sharedCount: { type: Number, default: 0 },
    downloadCount: { type: Number, default: 0 },
    savedTemplates: { type: Number, default: 0 },
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
