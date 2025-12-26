const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // ✅ FIX
    pass: process.env.EMAIL_PASS, // ✅ FIX
  },
  connectionTimeout: 10000,
});

transporter.verify((err) => {
  if (err) {
    console.log("❌ SMTP VERIFY ERROR:", err);
  } else {
    console.log("✅ SMTP READY");
  }
});

module.exports = transporter;
