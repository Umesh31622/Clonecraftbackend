
// const Template = require("../models/templateModel");
// const cloudinary = require("../config/cloudinary");

// // GET all templates
// exports.getTemplates = async (req, res) => {
//   try {
//     const templates = await Template.find().populate("category");
//     res.json({ success: true, templates });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // CREATE a template
// exports.createTemplate = async (req, res) => {
//   try {
//     const { title, type, status, category, profilePosition, transitionType, orientation } = req.body;

//     if (!title || !type || !category) {
//       return res.status(400).json({ success: false, message: "Title, Type and Category are required" });
//     }

//     let fileUrl;
//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         resource_type: type === "video" ? "video" : "image",
//         folder: "templates",
//       });
//       fileUrl = result.secure_url;
//     }

//     const template = await Template.create({
//       title,
//       type,
//       status: status || "active",
//       category,
//       profilePosition: profilePosition || "center",
//       transitionType: transitionType || "fade",
//       orientation: orientation || "landscape",
//       file: fileUrl,
//     });

//     const populated = await template.populate("category");
//     res.json({ success: true, template: populated });
//   } catch (err) {
//     console.error("❌ Add Template Error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // UPDATE template
// exports.updateTemplate = async (req, res) => {
//   try {
//     const { title, type, status, category, profilePosition, transitionType, orientation } = req.body;

//     if (!title || !type || !category) {
//       return res.status(400).json({ success: false, message: "Title, Type and Category are required" });
//     }

//     let fileUrl;
//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         resource_type: type === "video" ? "video" : "image",
//         folder: "templates",
//       });
//       fileUrl = result.secure_url;
//     }

//     const updated = await Template.findByIdAndUpdate(
//       req.params.id,
//       { title, type, status, category, profilePosition, transitionType, orientation, ...(fileUrl && { file: fileUrl }) },
//       { new: true, runValidators: true }
//     ).populate("category");

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
//     res.json({ success: true, message: "Template deleted" });
//   } catch (err) {
//     console.error("❌ Delete Template Error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
const Template = require("../models/templateModel");
const cloudinary = require("../config/cloudinary");

// GET all templates
exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.find()
      .populate("category")
      .populate("politician");
    res.json({ success: true, templates });
  } catch (err) {
    console.error("❌ Get Templates Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// CREATE a template
exports.createTemplate = async (req, res) => {
  try {
    const { title, type, status, category, politician, profilePosition, transitionType, orientation } = req.body;

    if (!title || !type || (!category && !politician)) {
      return res.status(400).json({ success: false, message: "Title, Type and either Category or Politician are required" });
    }

    let fileUrl;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: type === "video" ? "video" : "image",
        folder: "templates",
      });
      fileUrl = result.secure_url;
    }

    // Create template
    let template = await Template.create({
      title,
      type,
      status: status || "active",
      category: category || undefined,
      politician: politician || undefined,
      profilePosition: profilePosition || "center",
      transitionType: transitionType || "fade",
      orientation: orientation || "landscape",
      file: fileUrl,
    });

    // Populate after creation
    template = await Template.findById(template._id)
      .populate("category")
      .populate("politician");

    res.json({ success: true, template });
  } catch (err) {
    console.error("❌ Create Template Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE template
exports.updateTemplate = async (req, res) => {
  try {
    const { title, type, status, category, politician, profilePosition, transitionType, orientation } = req.body;

    if (!title || !type || (!category && !politician)) {
      return res.status(400).json({ success: false, message: "Title, Type and either Category or Politician are required" });
    }

    let fileUrl;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: type === "video" ? "video" : "image",
        folder: "templates",
      });
      fileUrl = result.secure_url;
    }

    let updated = await Template.findByIdAndUpdate(
      req.params.id,
      {
        title,
        type,
        status,
        category: category || undefined,
        politician: politician || undefined,
        profilePosition,
        transitionType,
        orientation,
        ...(fileUrl && { file: fileUrl }),
      },
      { new: true, runValidators: true }
    )
      .populate("category")
      .populate("politician");

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
    res.json({ success: true, message: "Template deleted successfully" });
  } catch (err) {
    console.error("❌ Delete Template Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
