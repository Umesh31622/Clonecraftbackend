// const Frame = require("../models/frameModel");
// const cloudinary = require("../config/cloudinary");

// // ✅ Create Frame
// exports.createFrame = async (req, res) => {
//   try {
//     const { title } = req.body;
//     if (!title)
//       return res.status(400).json({ success: false, message: "Title is required" });

//     if (!req.file)
//       return res.status(400).json({ success: false, message: "Image is required" });

//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: "frames",
//       allowed_formats: ["jpg", "jpeg", "png", "webp"],
//     });

//     const frame = await Frame.create({
//       title,
//       image: result.secure_url,
//     });

//     res.status(201).json({ success: true, data: frame });
//   } catch (error) {
//     console.error("❌ Create Frame Error:", error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // ✅ Get All Frames
// exports.getFrames = async (req, res) => {
//   try {
//     const frames = await Frame.find().sort({ createdAt: -1 });
//     res.json({ success: true, data: frames });
//   } catch (error) {
//     console.error("❌ Get Frames Error:", error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // ✅ Update Frame
// exports.updateFrame = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title } = req.body;

//     const frame = await Frame.findById(id);
//     if (!frame) return res.status(404).json({ success: false, message: "Frame not found" });

//     let updateData = { title: title || frame.title };

//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         folder: "frames",
//         allowed_formats: ["jpg", "jpeg", "png", "webp"],
//       });
//       updateData.image = result.secure_url;
//     }

//     const updated = await Frame.findByIdAndUpdate(id, updateData, { new: true });

//     res.json({ success: true, data: updated });
//   } catch (error) {
//     console.error("❌ Update Frame Error:", error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // ✅ Delete Frame
// exports.deleteFrame = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const frame = await Frame.findById(id);
//     if (!frame) return res.status(404).json({ success: false, message: "Frame not found" });

//     await frame.deleteOne();
//     res.json({ success: true, message: "Frame deleted successfully" });
//   } catch (error) {
//     console.error("❌ Delete Frame Error:", error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };
const Frame = require("../models/frameModel");
const cloudinary = require("../config/cloudinary");

// ✅ Create Frame
exports.createFrame = async (req, res) => {
  try {
    const { title, height, width, frameType } = req.body;

    if (!title || !height || !width)
      return res.status(400).json({ success: false, message: "Title, height, and width are required" });

    if (!req.file)
      return res.status(400).json({ success: false, message: "Image is required" });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "frames",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      transformation: [{ width: Number(width), height: Number(height), crop: "fill" }],
    });

    const frame = await Frame.create({
      title,
      height,
      width,
      frameType: frameType || "default",
      image: result.secure_url,
    });

    res.status(201).json({ success: true, data: frame });
  } catch (error) {
    console.error("❌ Create Frame Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Get All Frames
exports.getFrames = async (req, res) => {
  try {
    const frames = await Frame.find().sort({ createdAt: -1 });
    res.json({ success: true, data: frames });
  } catch (error) {
    console.error("❌ Get Frames Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Update Frame
exports.updateFrame = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, height, width, frameType } = req.body;

    const frame = await Frame.findById(id);
    if (!frame) return res.status(404).json({ success: false, message: "Frame not found" });

    let updateData = {
      title: title || frame.title,
      height: height || frame.height,
      width: width || frame.width,
      frameType: frameType || frame.frameType,
    };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "frames",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [{ width: Number(width), height: Number(height), crop: "fill" }],
      });
      updateData.image = result.secure_url;
    }

    const updated = await Frame.findByIdAndUpdate(id, updateData, { new: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("❌ Update Frame Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Delete Frame
exports.deleteFrame = async (req, res) => {
  try {
    const { id } = req.params;
    const frame = await Frame.findById(id);
    if (!frame) return res.status(404).json({ success: false, message: "Frame not found" });

    await frame.deleteOne();
    res.json({ success: true, message: "Frame deleted successfully" });
  } catch (error) {
    console.error("❌ Delete Frame Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
