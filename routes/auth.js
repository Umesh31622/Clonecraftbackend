// const express = require("express");
// const router = express.Router();
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const nodemailer = require("nodemailer");

// // Mail transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
// });
// transporter.verify().then(() => console.log("✅ Mail transporter ready"));

// // USER SIGNUP - Send OTP
// router.post("/signup/send-otp", async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ success: false, message: "Email required" });

//     let user = await User.findOne({ email });
//     if (user && user.status === "active")
//       return res.status(400).json({ success: false, message: "User already exists. Please login." });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpires = Date.now() + 10 * 60 * 1000;

//     if (!user) user = new User({ email });
//     user.otp = otp;
//     user.otpExpires = otpExpires;
//     await user.save();

//     await transporter.sendMail({
//       from: `"Crafto App" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Signup OTP",
//       text: `Your OTP is ${otp}. Expires in 10 min.`,
//     });

//     res.json({ success: true, message: "OTP sent to email" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // USER SIGNUP - Verify OTP
// router.post("/signup/verify-otp", async (req, res) => {
//   try {
//     const { email, otp, name } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     if (user.otp !== otp) return res.status(400).json({ success: false, message: "Invalid OTP" });
//     if (user.otpExpires < Date.now()) return res.status(400).json({ success: false, message: "OTP expired" });

//     user.name = name || user.name;
//     user.status = "active";
//     user.otp = null;
//     user.otpExpires = null;
//     await user.save();

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
//     res.json({ success: true, message: "Signup successful", token, user });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // USER LOGIN - Send OTP
// router.post("/login/send-otp", async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email, role: "user" });
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     user.otp = otp;
//     user.otpExpires = Date.now() + 10 * 60 * 1000;
//     await user.save();

//     await transporter.sendMail({
//       from: `"Crafto App" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Login OTP",
//       text: `Your OTP is ${otp}. Expires in 10 min.`,
//     });

//     res.json({ success: true, message: "Login OTP sent" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // USER LOGIN - Verify OTP
// router.post("/login/verify-otp", async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     const user = await User.findOne({ email, role: "user" });
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     if (user.otp !== otp) return res.status(400).json({ success: false, message: "Invalid OTP" });
//     if (user.otpExpires < Date.now()) return res.status(400).json({ success: false, message: "OTP expired" });

//     user.otp = null;
//     user.otpExpires = null;
//     await user.save();

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
//     res.json({ success: true, message: "Login successful", token, user });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const nodemailer = require("nodemailer");

// /* ================= MAIL TRANSPORTER ================= */
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, // APP PASSWORD
//   },
// });

// /* ================= MAIL HELPER ================= */
// const sendOtpMail = async (to, subject, text) => {
//   try {
//     await transporter.sendMail({
//       from: `"Crafto App" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       text,
//     });
//     return true;
//   } catch (err) {
//     console.error("❌ Email error:", err.message);
//     return false;
//   }
// };

// /* ================= SIGNUP SEND OTP ================= */
// router.post("/signup/send-otp", async (req, res) => {
//   try {
//     const email = req.body.email?.toLowerCase();
//     if (!email)
//       return res.status(400).json({ success: false, message: "Email required" });

//     let user = await User.findOne({ email });
//     if (user && user.status === "active")
//       return res.status(400).json({
//         success: false,
//         message: "User already exists. Please login.",
//       });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     if (!user) user = new User({ email });
//     user.otp = otp;
//     user.otpExpires = Date.now() + 10 * 60 * 1000;
//     await user.save();

//     const sent = await sendOtpMail(
//       email,
//       "Signup OTP",
//       `Your OTP is ${otp}. Expires in 10 minutes.`
//     );

//     if (!sent)
//       return res
//         .status(500)
//         .json({ success: false, message: "Email service failed" });

//     res.json({ success: true, message: "OTP sent to email" });
//   } catch (err) {
//     console.error("❌ Signup send OTP:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// /* ================= SIGNUP VERIFY OTP ================= */
// router.post("/signup/verify-otp", async (req, res) => {
//   try {
//     const email = req.body.email?.toLowerCase();
//     const otp = req.body.otp?.trim();
//     const { name } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(404).json({ success: false, message: "User not found" });

//     if (!user.otp || !user.otpExpires)
//       return res.status(400).json({ success: false, message: "OTP not requested" });

//     if (user.otpExpires < Date.now())
//       return res.status(400).json({ success: false, message: "OTP expired" });

//     if (user.otp !== otp)
//       return res.status(400).json({ success: false, message: "Invalid OTP" });

//     user.name = name || user.name;
//     user.status = "active";
//     user.otp = null;
//     user.otpExpires = null;
//     await user.save();

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({ success: true, message: "Signup successful", token, user });
//   } catch (err) {
//     console.error("❌ Signup verify OTP:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// /* ================= LOGIN SEND OTP ================= */
// router.post("/login/send-otp", async (req, res) => {
//   try {
//     const email = req.body.email?.toLowerCase();

//     const user = await User.findOne({ email, role: "user" });
//     if (!user)
//       return res.status(404).json({ success: false, message: "User not found" });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     user.otp = otp;
//     user.otpExpires = Date.now() + 10 * 60 * 1000;
//     await user.save();

//     const sent = await sendOtpMail(
//       email,
//       "Login OTP",
//       `Your OTP is ${otp}. Expires in 10 minutes.`
//     );

//     if (!sent)
//       return res
//         .status(500)
//         .json({ success: false, message: "Email service failed" });

//     res.json({ success: true, message: "Login OTP sent" });
//   } catch (err) {
//     console.error("❌ Login send OTP:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// /* ================= LOGIN VERIFY OTP ================= */
// router.post("/login/verify-otp", async (req, res) => {
//   try {
//     const email = req.body.email?.toLowerCase();
//     const otp = req.body.otp?.trim();

//     const user = await User.findOne({ email, role: "user" });
//     if (!user)
//       return res.status(404).json({ success: false, message: "User not found" });

//     if (!user.otp || !user.otpExpires)
//       return res.status(400).json({ success: false, message: "OTP not requested" });

//     if (user.otpExpires < Date.now())
//       return res.status(400).json({ success: false, message: "OTP expired" });

//     if (user.otp !== otp)
//       return res.status(400).json({ success: false, message: "Invalid OTP" });

//     user.otp = null;
//     user.otpExpires = null;
//     await user.save();

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({ success: true, message: "Login successful", token, user });
//   } catch (err) {
//     console.error("❌ Login verify OTP:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const nodemailer = require("nodemailer");

// /* =====================================================
//    ✅ GMAIL SMTP (LOCAL + PRODUCTION SAFE)
//    IMPORTANT:
//    - Use Gmail APP PASSWORD only
//    - Works on Render / VPS / Localhost
// ===================================================== */
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,          // 🔥 MUST
//   secure: true,       // 🔥 MUST for 465
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, // Gmail APP password
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// /* Verify SMTP once on server start */
// transporter.verify((err) => {
//   if (err) {
//     console.error("❌ SMTP ERROR:", err.message);
//   } else {
//     console.log("✅ Gmail SMTP READY");
//   }
// });

// /* ================= MAIL HELPER ================= */
// const sendOtpMail = async (to, subject, text) => {
//   try {
//     await transporter.sendMail({
//       from: `"Crafto App" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       text,
//     });
//     return true;
//   } catch (err) {
//     console.error("❌ Email error:", err.message);
//     return false;
//   }
// };

// /* =====================================================
//    SIGNUP – SEND OTP
// ===================================================== */
// router.post("/signup/send-otp", async (req, res) => {
//   try {
//     const email = req.body.email?.toLowerCase();
//     if (!email)
//       return res.status(400).json({ success: false, message: "Email required" });

//     let user = await User.findOne({ email });
//     if (user && user.status === "active") {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists. Please login.",
//       });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     if (!user) user = new User({ email });
//     user.otp = otp;
//     user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 min
//     await user.save();

//     const sent = await sendOtpMail(
//       email,
//       "Signup OTP",
//       `Your OTP is ${otp}. It will expire in 10 minutes.`
//     );

//     if (!sent)
//       return res
//         .status(500)
//         .json({ success: false, message: "Email service failed" });

//     res.json({ success: true, message: "OTP sent to email" });
//   } catch (err) {
//     console.error("❌ Signup send OTP:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// /* =====================================================
//    SIGNUP – VERIFY OTP
// ===================================================== */
// router.post("/signup/verify-otp", async (req, res) => {
//   try {
//     const email = req.body.email?.toLowerCase();
//     const otp = req.body.otp?.trim();
//     const { name } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(404).json({ success: false, message: "User not found" });

//     if (!user.otp || !user.otpExpires)
//       return res
//         .status(400)
//         .json({ success: false, message: "OTP not requested" });

//     if (user.otpExpires < Date.now())
//       return res
//         .status(400)
//         .json({ success: false, message: "OTP expired" });

//     if (user.otp !== otp)
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid OTP" });

//     user.name = name || user.name;
//     user.status = "active";
//     user.otp = null;
//     user.otpExpires = null;
//     await user.save();

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       success: true,
//       message: "Signup successful",
//       token,
//       user,
//     });
//   } catch (err) {
//     console.error("❌ Signup verify OTP:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// /* =====================================================
//    LOGIN – SEND OTP
// ===================================================== */
// router.post("/login/send-otp", async (req, res) => {
//   try {
//     const email = req.body.email?.toLowerCase();

//     const user = await User.findOne({ email, role: "user" });
//     if (!user)
//       return res.status(404).json({ success: false, message: "User not found" });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     user.otp = otp;
//     user.otpExpires = Date.now() + 10 * 60 * 1000;
//     await user.save();

//     const sent = await sendOtpMail(
//       email,
//       "Login OTP",
//       `Your OTP is ${otp}. It will expire in 10 minutes.`
//     );

//     if (!sent)
//       return res
//         .status(500)
//         .json({ success: false, message: "Email service failed" });

//     res.json({ success: true, message: "Login OTP sent" });
//   } catch (err) {
//     console.error("❌ Login send OTP:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// /* =====================================================
//    LOGIN – VERIFY OTP
// ===================================================== */
// router.post("/login/verify-otp", async (req, res) => {
//   try {
//     const email = req.body.email?.toLowerCase();
//     const otp = req.body.otp?.trim();

//     const user = await User.findOne({ email, role: "user" });
//     if (!user)
//       return res.status(404).json({ success: false, message: "User not found" });

//     if (!user.otp || !user.otpExpires)
//       return res
//         .status(400)
//         .json({ success: false, message: "OTP not requested" });

//     if (user.otpExpires < Date.now())
//       return res
//         .status(400)
//         .json({ success: false, message: "OTP expired" });

//     if (user.otp !== otp)
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid OTP" });

//     user.otp = null;
//     user.otpExpires = null;
//     await user.save();

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       success: true,
//       message: "Login successful",
//       token,
//       user,
//     });
//   } catch (err) {
//     console.error("❌ Login verify OTP:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// transporter.verify((err) => {
//   if (err) {
//     console.error("Gmail SMTP ERROR:", err.message);
//   } else {
//     console.log("Gmail SMTP READY");
//   }
// });

// const sendOtpMail = async (to, subject, text) => {
//   try {
//     await transporter.sendMail({
//       from: `"Crafto App" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       text,
//     });
//     return true;
//   } catch (err) {
//     console.error("Email error:", err.message);
//     return false;
//   }
// };

// router.post("/signup/send-otp", async (req, res) => {
//   try {
//     const email = req.body.email?.toLowerCase();
//     if (!email) {
//       return res.status(400).json({ success: false, message: "Email required" });
//     }

//     let user = await User.findOne({ email });
//     if (user && user.status === "active") {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists. Please login.",
//       });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     if (!user) user = new User({ email });
//     user.otp = otp;
//     user.otpExpires = Date.now() + 10 * 60 * 1000;
//     await user.save();

//     const sent = await sendOtpMail(
//       email,
//       "Signup OTP",
//       `Your OTP is ${otp}. It will expire in 10 minutes.`
//     );

//     if (!sent) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Email service failed" });
//     }

//     res.json({ success: true, message: "OTP sent to email" });
//   } catch (err) {
//     console.error("Signup send OTP:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// router.post("/signup/verify-otp", async (req, res) => {
//   try {
//     const email = req.body.email?.toLowerCase();
//     const otp = req.body.otp?.trim();
//     const { name } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     if (!user.otp || !user.otpExpires) {
//       return res
//         .status(400)
//         .json({ success: false, message: "OTP not requested" });
//     }

//     if (user.otpExpires < Date.now()) {
//       return res
//         .status(400)
//         .json({ success: false, message: "OTP expired" });
//     }

//     if (user.otp !== otp) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid OTP" });
//     }

//     user.name = name || user.name;
//     user.status = "active";
//     user.otp = null;
//     user.otpExpires = null;
//     await user.save();

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       success: true,
//       message: "Signup successful",
//       token,
//       user,
//     });
//   } catch (err) {
//     console.error("Signup verify OTP:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// router.post("/login/send-otp", async (req, res) => {
//   try {
//     const email = req.body.email?.toLowerCase();
//     if (!email) {
//       return res.status(400).json({ success: false, message: "Email required" });
//     }

//     const user = await User.findOne({ email, role: "user" });
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     user.otp = otp;
//     user.otpExpires = Date.now() + 10 * 60 * 1000;
//     await user.save();

//     const sent = await sendOtpMail(
//       email,
//       "Login OTP",
//       `Your OTP is ${otp}. It will expire in 10 minutes.`
//     );

//     if (!sent) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Email service failed" });
//     }

//     res.json({ success: true, message: "Login OTP sent" });
//   } catch (err) {
//     console.error("Login send OTP:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// router.post("/login/verify-otp", async (req, res) => {
//   try {
//     const email = req.body.email?.toLowerCase();
//     const otp = req.body.otp?.trim();

//     const user = await User.findOne({ email, role: "user" });
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     if (!user.otp || !user.otpExpires) {
//       return res
//         .status(400)
//         .json({ success: false, message: "OTP not requested" });
//     }

//     if (user.otpExpires < Date.now()) {
//       return res
//         .status(400)
//         .json({ success: false, message: "OTP expired" });
//     }

//     if (user.otp !== otp) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid OTP" });
//     }

//     user.otp = null;
//     user.otpExpires = null;
//     await user.save();

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       success: true,
//       message: "Login successful",
//       token,
//       user,
//     });
//   } catch (err) {
//     console.error("Login verify OTP:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");

/* =====================================================
   ✅ GMAIL SMTP (RENDER + LOCAL SAFE)
   IMPORTANT:
   - Gmail APP PASSWORD only
   - Port 587 is MORE reliable than 465 on Render
===================================================== */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,              // ✅ CHANGE: 587 (recommended)
  secure: false,          // ✅ false for 587
  requireTLS: true,       // ✅ IMPORTANT
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail APP password
  },
  connectionTimeout: 15000,
  socketTimeout: 15000,
});

/* Verify SMTP once on server start */
transporter.verify((err) => {
  if (err) {
    console.error("❌ Gmail SMTP ERROR:", err);
  } else {
    console.log("✅ Gmail SMTP READY");
  }
});

/* =====================================================
   📧 MAIL HELPER
===================================================== */
const sendOtpMail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: `"Crafto App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
    return true;
  } catch (err) {
    console.error("❌ Email error:", err);
    return false;
  }
};

/* =====================================================
   🟢 SIGNUP – SEND OTP
===================================================== */
router.post("/signup/send-otp", async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase();
    if (!email)
      return res.status(400).json({ success: false, message: "Email required" });

    let user = await User.findOne({ email });
    if (user && user.status === "active") {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login.",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    if (!user) user = new User({ email });
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    const sent = await sendOtpMail(
      email,
      "Signup OTP",
      `Your OTP is ${otp}. It will expire in 10 minutes.`
    );

    if (!sent)
      return res.status(500).json({
        success: false,
        message: "Email service failed",
      });

    res.json({ success: true, message: "OTP sent to email" });
  } catch (err) {
    console.error("Signup send OTP:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* =====================================================
   🟢 SIGNUP – VERIFY OTP
===================================================== */
router.post("/signup/verify-otp", async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase();
    const otp = req.body.otp?.trim();
    const { name } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    if (!user.otp || !user.otpExpires)
      return res.status(400).json({ success: false, message: "OTP not requested" });

    if (user.otpExpires < Date.now())
      return res.status(400).json({ success: false, message: "OTP expired" });

    if (user.otp !== otp)
      return res.status(400).json({ success: false, message: "Invalid OTP" });

    user.name = name || user.name;
    user.status = "active";
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Signup successful",
      token,
      user,
    });
  } catch (err) {
    console.error("Signup verify OTP:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* =====================================================
   🔵 LOGIN – SEND OTP
===================================================== */
router.post("/login/send-otp", async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase();
    if (!email)
      return res.status(400).json({ success: false, message: "Email required" });

    const user = await User.findOne({ email, role: "user" });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    const sent = await sendOtpMail(
      email,
      "Login OTP",
      `Your OTP is ${otp}. It will expire in 10 minutes.`
    );

    if (!sent)
      return res.status(500).json({
        success: false,
        message: "Email service failed",
      });

    res.json({ success: true, message: "Login OTP sent" });
  } catch (err) {
    console.error("Login send OTP:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* =====================================================
   🔵 LOGIN – VERIFY OTP
===================================================== */
router.post("/login/verify-otp", async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase();
    const otp = req.body.otp?.trim();

    const user = await User.findOne({ email, role: "user" });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    if (!user.otp || !user.otpExpires)
      return res.status(400).json({ success: false, message: "OTP not requested" });

    if (user.otpExpires < Date.now())
      return res.status(400).json({ success: false, message: "OTP expired" });

    if (user.otp !== otp)
      return res.status(400).json({ success: false, message: "Invalid OTP" });

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (err) {
    console.error("Login verify OTP:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
