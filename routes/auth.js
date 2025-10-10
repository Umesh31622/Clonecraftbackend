
// const express = require("express");
// const router = express.Router();
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
// const User = require("../models/User");

// // ✅ Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// transporter.verify()
//   .then(() => console.log("✅ Mail transporter ready"))
//   .catch(err => console.error("❌ Mail transporter error:", err));

// /* ======================
//       SIGNUP FLOW
// ====================== */

// // Send OTP for Signup
// router.post("/signup/send-otp", async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ success: false, message: "Email required" });

//     const existing = await User.findOne({ email });
//     if (existing && existing.status === "active") {
//       return res.status(400).json({ success: false, message: "User already exists. Please login." });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpires = Date.now() + 10 * 60 * 1000;

//     let user = await User.findOne({ email });
//     if (!user) user = new User({ email });

//     user.otp = otp;
//     user.otpExpires = otpExpires;
//     await user.save();

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Signup OTP",
//       text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
//     });

//     res.json({ success: true, message: "Signup OTP sent to email" });
//   } catch (err) {
//     console.error("Signup send-otp error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // Verify OTP for Signup
// router.post("/signup/verify-otp", async (req, res) => {
//   try {
//     const { email, otp, name } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     if (user.otp !== otp) return res.status(400).json({ success: false, message: "Invalid OTP" });
//     if (user.otpExpires < Date.now()) return res.status(400).json({ success: false, message: "OTP expired" });

//     user.name = name || "New User";
//     user.status = "active";
//     user.otp = null;
//     user.otpExpires = null;
//     await user.save();

//     res.json({ success: true, message: "Signup successful", user });
//   } catch (err) {
//     console.error("Signup verify error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// /* ======================
//        LOGIN FLOW
// ====================== */

// // Send OTP for Login
// router.post("/login/send-otp", async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     user.otp = otp;
//     user.otpExpires = Date.now() + 10 * 60 * 1000;
//     await user.save();

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Login OTP",
//       text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
//     });

//     res.json({ success: true, message: "Login OTP sent to email" });
//   } catch (err) {
//     console.error("Login send-otp error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // Verify OTP for Login
// router.post("/login/verify-otp", async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     if (user.otp !== otp) return res.status(400).json({ success: false, message: "Invalid OTP" });
//     if (user.otpExpires < Date.now()) return res.status(400).json({ success: false, message: "OTP expired" });

//     user.otp = null;
//     user.otpExpires = null;
//     await user.save();

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
//     res.json({ success: true, message: "Login successful", token, user });
//   } catch (err) {
//     console.error("Login verify error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");

// ✅ Gmail Mail Transporter (with App Password)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Verify transporter once
transporter.verify()
  .then(() => console.log("✅ Mail transporter ready"))
  .catch((err) => console.error("❌ Mail transporter error:", err));

// ======================
//       SIGNUP FLOW
// ======================

// Send OTP for Signup
router.post("/signup/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ success: false, message: "Email required" });

    const existing = await User.findOne({ email });
    if (existing && existing.status === "active") {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login.",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    let user = await User.findOne({ email });
    if (!user) user = new User({ email });

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await transporter.sendMail({
      from: `"Crafto App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Crafto Signup OTP",
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    });

    res.json({ success: true, message: "Signup OTP sent to email" });
  } catch (err) {
    console.error("Signup send-otp error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Verify OTP for Signup
router.post("/signup/verify-otp", async (req, res) => {
  try {
    const { email, otp, name } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    if (user.otp !== otp)
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    if (user.otpExpires < Date.now())
      return res.status(400).json({ success: false, message: "OTP expired" });

    user.name = name || "New User";
    user.status = "active";
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.json({ success: true, message: "Signup successful", user });
  } catch (err) {
    console.error("Signup verify error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ======================
//       LOGIN FLOW
// ======================

// Send OTP for Login
router.post("/login/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    await transporter.sendMail({
      from: `"Crafto App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Crafto Login OTP",
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    });

    res.json({ success: true, message: "Login OTP sent to email" });
  } catch (err) {
    console.error("Login send-otp error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Verify OTP for Login
router.post("/login/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    if (user.otp !== otp)
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    if (user.otpExpires < Date.now())
      return res.status(400).json({ success: false, message: "OTP expired" });

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ success: true, message: "Login successful", token, user });
  } catch (err) {
    console.error("Login verify error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
