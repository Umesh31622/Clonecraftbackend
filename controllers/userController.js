
// const User = require("../models/User");

// // GET all users
// exports.getUsers = async (req, res) => {
//   try {
//     const users = await User.find().sort({ createdAt: -1 });
//     res.json({ success: true, users });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // GET single user
// exports.getUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });
//     res.json({ success: true, user });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // CREATE user
// exports.createUser = async (req, res) => {
//   try {
//     const { name, email, subscription, status } = req.body;
//     const exists = await User.findOne({ email });
//     if (exists) return res.status(400).json({ success: false, message: "Email already exists" });

//     const user = await User.create({ name, email, subscription, status });
//     res.json({ success: true, user });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // UPDATE user
// exports.updateUser = async (req, res) => {
//   try {
//     const { name, email, subscription, status } = req.body;
//     const updated = await User.findByIdAndUpdate(
//       req.params.id,
//       { name, email, subscription, status },
//       { new: true }
//     );
//     if (!updated) return res.status(404).json({ success: false, message: "User not found" });
//     res.json({ success: true, user: updated });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // DELETE user
// exports.deleteUser = async (req, res) => {
//   try {
//     const deleted = await User.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ success: false, message: "User not found" });
//     res.json({ success: true, message: "User deleted" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
const User = require("../models/User");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-otp -otpExpires");
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-otp -otpExpires");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
