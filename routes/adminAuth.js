const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// ADMIN REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, message: "All fields required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const admin = await User.create({ name, email, password: hashed, role: "admin", status: "active" });

    res.json({ success: true, message: "Admin created", admin });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ADMIN LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: "Email & password required" });

    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ success: true, message: "Admin login successful", token, admin });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
