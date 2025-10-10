// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   otp: { type: String },
//   otpExpires: { type: Date },
//   subscription: {
//     type: {
//       type: String,
//       default: "free"
//     },
//     isActive: {
//       type: Boolean,
//       default: false
//     },
//     plan: {
//       type: String,
//       default: "free"
//     },
//     status: {
//       type: String,
//       default: "active"
//     }
//   }
// }, { timestamps: true });

// module.exports = mongoose.model("User", UserSchema);const jwt = require("jsonwebtoken");const mongoose = require("mongoose");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  status: { type: String, enum: ["inactive", "active"], default: "inactive" },
  otp: { type: String },
  otpExpires: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
