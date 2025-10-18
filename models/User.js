
// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: { type: String },
//   email: { type: String, required: true, unique: true },
//   status: { type: String, enum: ["inactive", "active"], default: "inactive" },
//   otp: { type: String },
//   otpExpires: { type: Date },
// }, { timestamps: true });

// module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, default: "New User" },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  status: { type: String, enum: ["active", "inactive"], default: "inactive" },
  otp: { type: String },
  otpExpires: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
