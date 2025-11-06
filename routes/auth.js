const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");

// Mail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});
transporter.verify().then(() => console.log("✅ Mail transporter ready"));

// USER SIGNUP - Send OTP
router.post("/signup/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email required" });

    let user = await User.findOne({ email });
    if (user && user.status === "active")
      return res.status(400).json({ success: false, message: "User already exists. Please login." });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    if (!user) user = new User({ email });
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await transporter.sendMail({
      from: `"Crafto App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Signup OTP",
      text: `Your OTP is ${otp}. Expires in 10 min.`,
    });

    res.json({ success: true, message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// USER SIGNUP - Verify OTP
router.post("/signup/verify-otp", async (req, res) => {
  try {
    const { email, otp, name } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.otp !== otp) return res.status(400).json({ success: false, message: "Invalid OTP" });
    if (user.otpExpires < Date.now()) return res.status(400).json({ success: false, message: "OTP expired" });

    user.name = name || user.name;
    user.status = "active";
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ success: true, message: "Signup successful", token, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// USER LOGIN - Send OTP
router.post("/login/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email, role: "user" });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    await transporter.sendMail({
      from: `"Crafto App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Login OTP",
      text: `Your OTP is ${otp}. Expires in 10 min.`,
    });

    res.json({ success: true, message: "Login OTP sent" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// USER LOGIN - Verify OTP
router.post("/login/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email, role: "user" });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.otp !== otp) return res.status(400).json({ success: false, message: "Invalid OTP" });
    if (user.otpExpires < Date.now()) return res.status(400).json({ success: false, message: "OTP expired" });

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ success: true, message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
