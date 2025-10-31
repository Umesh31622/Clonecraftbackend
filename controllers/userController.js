
// const User = require("../models/User");

// exports.getUsers = async (req, res) => {
//   try {
//     const users = await User.find().select("-otp -otpExpires -password");
//     res.json({ success: true, users });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// const cloudinary = require("cloudinary").v2;
// const User = require("../models/User");

// // Cloudinary config (reads from .env)
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// /**
//  * GET /api/users
//  * Returns all users (excluding sensitive fields)
//  */
// exports.getUsers = async (req, res) => {
//   try {
//     const users = await User.find().select("-otp -otpExpires -password");
//     res.json({ success: true, users });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /**
//  * GET /api/users/:id
//  * Get single user by id (or email if you prefer)
//  */
// exports.getUserById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const user = await User.findById(id).select("-otp -otpExpires -password");
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });
//     res.json({ success: true, user });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /**
//  * PUT /api/users/profile
//  * Update profile of the logged in user (protected)
//  * Supports:
//  *  - multipart/form-data file under 'avatar' (multer)
//  *  - or JSON body 'image' containing base64 data URI
//  * Body allowed: name, userTag, email, bio, premium (boolean), stats (partial)
//  */
// exports.updateProfile = async (req, res) => {
//   try {
//     // assuming protect middleware attaches req.user with id/email
//     const userId = req.user && req.user._id ? req.user._id : req.body.userId;
//     if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

//     const updates = {};
//     const allowedFields = ["name", "userTag", "email", "bio", "premium"];
//     allowedFields.forEach((f) => {
//       if (req.body[f] !== undefined) updates[f] = req.body[f];
//     });

//     // merge stats updates if provided
//     if (req.body.stats && typeof req.body.stats === "object") {
//       // Use $inc or overwrite? We'll overwrite provided numeric fields
//       updates.stats = {};
//       const statFields = ["createdCount", "sharedCount", "downloadCount", "savedTemplates"];
//       statFields.forEach((s) => {
//         if (req.body.stats[s] !== undefined) updates.stats[s] = req.body.stats[s];
//       });
//     }

//     // Image handling:
//     // Option A: base64 image in req.body.image (data URI)
//     // Option B: uploaded file via multer at req.file (buffer or path)
//     let avatarUrl;
//     if (req.body.image) {
//       // image is expected as data:image/png;base64,xxxxx...
//       const uploadRes = await cloudinary.uploader.upload(req.body.image, {
//         folder: "user_profiles",
//         transformation: [{ width: 600, height: 600, crop: "limit" }],
//       });
//       avatarUrl = uploadRes.secure_url;
//     } else if (req.file) {
//       // req.file.buffer (if using multer memoryStorage) or req.file.path (if disk)
//       // We'll attempt to use upload_stream if buffer present, otherwise upload by path.
//       if (req.file.buffer) {
//         // upload from buffer
//         const streamUpload = (buffer) => {
//           return new Promise((resolve, reject) => {
//             const stream = cloudinary.uploader.upload_stream(
//               { folder: "user_profiles", transformation: [{ width: 600, height: 600, crop: "limit" }] },
//               (error, result) => {
//                 if (error) return reject(error);
//                 resolve(result);
//               }
//             );
//             stream.end(buffer);
//           });
//         };
//         const uploaded = await streamUpload(req.file.buffer);
//         avatarUrl = uploaded.secure_url;
//       } else if (req.file.path) {
//         // fallback if disk storage is used
//         const uploaded = await cloudinary.uploader.upload(req.file.path, {
//           folder: "user_profiles",
//           transformation: [{ width: 600, height: 600, crop: "limit" }],
//         });
//         avatarUrl = uploaded.secure_url;
//       }
//     }

//     if (avatarUrl) updates.avatarUrl = avatarUrl;

//     // Update user
//     const updated = await User.findByIdAndUpdate(userId, { $set: updates }, { new: true, upsert: false })
//       .select("-otp -otpExpires -password");

//     res.json({ success: true, user: updated });
//   } catch (err) {
//     console.error("updateProfile error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
const User = require("../models/User");

// ✅ Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Update Profile (with Cloudinary image)
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, bio } = req.body;

    const updates = { name, bio };

    // ✅ If image uploaded via Cloudinary (multer-storage-cloudinary)
    if (req.file && req.file.path) {
      updates.avatarUrl = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    ).select("-password");

    if (!updatedUser)
      return res.status(404).json({ success: false, message: "User not found" });

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("updateProfile error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};
