
// const Template = require("../models/templateModel");

// // GET all templates
// exports.getTemplates = async (req, res) => {
//   try {
//     const templates = await Template.find()
//       .populate("category")
//       .populate("politician");
//     res.json({ success: true, templates });
//   } catch (err) {
//     console.error("❌ Get Templates Error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // CREATE template
// exports.createTemplate = async (req, res) => {
//   try {
//     const { title, type, status, category, politician, profilePosition, transitionType, orientation } = req.body;

//     if (!title || !type || (!category && !politician)) {
//       return res.status(400).json({ success: false, message: "Title, Type and either Category or Politician are required" });
//     }

//     let fileUrl;
//     if (req.file) {
//       fileUrl = req.file.path || req.file.filename || req.file?.secure_url;
//     }

//     if (!fileUrl) return res.status(400).json({ success: false, message: "File is required" });

//     let template = await Template.create({
//       title,
//       type,
//       status: status || "active",
//       category: category || undefined,
//       politician: politician || undefined,
//       profilePosition: profilePosition || "center",
//       transitionType: transitionType || "fade",
//       orientation: orientation || "landscape",
//       file: fileUrl,
//     });

//     template = await Template.findById(template._id)
//       .populate("category")
//       .populate("politician");

//     res.json({ success: true, template });
//   } catch (err) {
//     console.error("❌ Create Template Error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // UPDATE template
// exports.updateTemplate = async (req, res) => {
//   try {
//     const { title, type, status, category, politician, profilePosition, transitionType, orientation } = req.body;

//     if (!title || !type || (!category && !politician)) {
//       return res.status(400).json({ success: false, message: "Title, Type and either Category or Politician are required" });
//     }

//     let fileUrl;
//     if (req.file) {
//       fileUrl = req.file.path || req.file.filename || req.file?.secure_url;
//     }

//     let updated = await Template.findByIdAndUpdate(
//       req.params.id,
//       {
//         title,
//         type,
//         status,
//         category: category || undefined,
//         politician: politician || undefined,
//         profilePosition,
//         transitionType,
//         orientation,
//         ...(fileUrl && { file: fileUrl }),
//       },
//       { new: true, runValidators: true }
//     )
//       .populate("category")
//       .populate("politician");

//     if (!updated) return res.status(404).json({ success: false, message: "Template not found" });

//     res.json({ success: true, template: updated });
//   } catch (err) {
//     console.error("❌ Update Template Error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // DELETE template
// exports.deleteTemplate = async (req, res) => {
//   try {
//     const deleted = await Template.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ success: false, message: "Template not found" });
//     res.json({ success: true, message: "Template deleted successfully" });
//   } catch (err) {
//     console.error("❌ Delete Template Error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
// controllers/templateController.js

const Template = require("../models/templateModel");

/**
 * Helper to get uploaded file URL from multer-storage-cloudinary or local multer.
 * multer-storage-cloudinary may put URL in req.file.path or req.file?.secure_url
 */
const getFileUrlFromReq = (file) => {
  if (!file) return null;
  return file.path || file.secure_url || file.filename || null;
};

// GET all templates
exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.find()
      .populate("category")
      .populate("politician")
      .populate("frame")
      .sort({ createdAt: -1 });

    res.json({ success: true, templates });
  } catch (err) {
    console.error("❌ Get Templates Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// CREATE template
exports.createTemplate = async (req, res) => {
  try {
    const {
      title,
      type,
      status,
      category,
      politician,
      profilePosition,
      transitionType,
      orientation,
      frame,
      transitionPlacement,
    } = req.body;

    if (!title || !type || (!category && !politician)) {
      return res.status(400).json({ success: false, message: "Title, Type and either Category or Politician are required" });
    }

    // Accept file either from local multer or Cloudinary storage middleware
    const fileUrl = getFileUrlFromReq(req.file);

    // File is optional only in update situations, but create expects file by your earlier logic.
    if (!fileUrl) return res.status(400).json({ success: false, message: "File is required" });

    let template = await Template.create({
      title,
      type,
      status: status || "active",
      category: category || undefined,
      politician: politician || undefined,
      frame: frame || undefined,
      transitionPlacement: transitionPlacement || "below",
      profilePosition: profilePosition || "center",
      transitionType: transitionType || "fade",
      orientation: orientation || "landscape",
      file: fileUrl,
    });

    template = await Template.findById(template._id)
      .populate("category")
      .populate("politician")
      .populate("frame");

    res.json({ success: true, template });
  } catch (err) {
    console.error("❌ Create Template Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE template
exports.updateTemplate = async (req, res) => {
  try {
    const {
      title,
      type,
      status,
      category,
      politician,
      profilePosition,
      transitionType,
      orientation,
      frame,
      transitionPlacement,
    } = req.body;

    if (!title || !type || (!category && !politician)) {
      return res.status(400).json({ success: false, message: "Title, Type and either Category or Politician are required" });
    }

    const fileUrl = getFileUrlFromReq(req.file);

    const updateBody = {
      title,
      type,
      status,
      category: category || undefined,
      politician: politician || undefined,
      frame: frame || undefined,
      transitionPlacement: transitionPlacement || "below",
      profilePosition,
      transitionType,
      orientation,
      ...(fileUrl && { file: fileUrl }),
    };

    const updated = await Template.findByIdAndUpdate(
      req.params.id,
      updateBody,
      { new: true, runValidators: true }
    )
      .populate("category")
      .populate("politician")
      .populate("frame");

    if (!updated) return res.status(404).json({ success: false, message: "Template not found" });

    res.json({ success: true, template: updated });
  } catch (err) {
    console.error("❌ Update Template Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE template
exports.deleteTemplate = async (req, res) => {
  try {
    const deleted = await Template.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Template not found" });
    // NOTE: this only deletes DB record. If you want remove file from Cloudinary, use cloudinary.uploader.destroy(public_id)
    res.json({ success: true, message: "Template deleted successfully" });
  } catch (err) {
    console.error("❌ Delete Template Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
