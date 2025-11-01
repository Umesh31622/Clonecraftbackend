
// // // const Template = require("../models/templateModel");

// // // // GET all templates
// // // exports.getTemplates = async (req, res) => {
// // //   try {
// // //     const templates = await Template.find()
// // //       .populate("category")
// // //       .populate("politician");
// // //     res.json({ success: true, templates });
// // //   } catch (err) {
// // //     console.error("❌ Get Templates Error:", err);
// // //     res.status(500).json({ success: false, message: err.message });
// // //   }
// // // };

// // // // CREATE template
// // // exports.createTemplate = async (req, res) => {
// // //   try {
// // //     const { title, type, status, category, politician, profilePosition, transitionType, orientation } = req.body;

// // //     if (!title || !type || (!category && !politician)) {
// // //       return res.status(400).json({ success: false, message: "Title, Type and either Category or Politician are required" });
// // //     }

// // //     let fileUrl;
// // //     if (req.file) {
// // //       fileUrl = req.file.path || req.file.filename || req.file?.secure_url;
// // //     }

// // //     if (!fileUrl) return res.status(400).json({ success: false, message: "File is required" });

// // //     let template = await Template.create({
// // //       title,
// // //       type,
// // //       status: status || "active",
// // //       category: category || undefined,
// // //       politician: politician || undefined,
// // //       profilePosition: profilePosition || "center",
// // //       transitionType: transitionType || "fade",
// // //       orientation: orientation || "landscape",
// // //       file: fileUrl,
// // //     });

// // //     template = await Template.findById(template._id)
// // //       .populate("category")
// // //       .populate("politician");

// // //     res.json({ success: true, template });
// // //   } catch (err) {
// // //     console.error("❌ Create Template Error:", err);
// // //     res.status(500).json({ success: false, message: err.message });
// // //   }
// // // };

// // // // UPDATE template
// // // exports.updateTemplate = async (req, res) => {
// // //   try {
// // //     const { title, type, status, category, politician, profilePosition, transitionType, orientation } = req.body;

// // //     if (!title || !type || (!category && !politician)) {
// // //       return res.status(400).json({ success: false, message: "Title, Type and either Category or Politician are required" });
// // //     }

// // //     let fileUrl;
// // //     if (req.file) {
// // //       fileUrl = req.file.path || req.file.filename || req.file?.secure_url;
// // //     }

// // //     let updated = await Template.findByIdAndUpdate(
// // //       req.params.id,
// // //       {
// // //         title,
// // //         type,
// // //         status,
// // //         category: category || undefined,
// // //         politician: politician || undefined,
// // //         profilePosition,
// // //         transitionType,
// // //         orientation,
// // //         ...(fileUrl && { file: fileUrl }),
// // //       },
// // //       { new: true, runValidators: true }
// // //     )
// // //       .populate("category")
// // //       .populate("politician");

// // //     if (!updated) return res.status(404).json({ success: false, message: "Template not found" });

// // //     res.json({ success: true, template: updated });
// // //   } catch (err) {
// // //     console.error("❌ Update Template Error:", err);
// // //     res.status(500).json({ success: false, message: err.message });
// // //   }
// // // };

// // // // DELETE template
// // // exports.deleteTemplate = async (req, res) => {
// // //   try {
// // //     const deleted = await Template.findByIdAndDelete(req.params.id);
// // //     if (!deleted) return res.status(404).json({ success: false, message: "Template not found" });
// // //     res.json({ success: true, message: "Template deleted successfully" });
// // //   } catch (err) {
// // //     console.error("❌ Delete Template Error:", err);
// // //     res.status(500).json({ success: false, message: err.message });
// // //   }
// // // };
// // // controllers/templateController.js

// // const Template = require("../models/templateModel");

// // /**
// //  * Helper to get uploaded file URL from multer-storage-cloudinary or local multer.
// //  * multer-storage-cloudinary may put URL in req.file.path or req.file?.secure_url
// //  */
// // const getFileUrlFromReq = (file) => {
// //   if (!file) return null;
// //   return file.path || file.secure_url || file.filename || null;
// // };

// // // GET all templates
// // exports.getTemplates = async (req, res) => {
// //   try {
// //     const templates = await Template.find()
// //       .populate("category")
// //       .populate("politician")
// //       .populate("frame")
// //       .sort({ createdAt: -1 });

// //     res.json({ success: true, templates });
// //   } catch (err) {
// //     console.error("❌ Get Templates Error:", err);
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // CREATE template
// // exports.createTemplate = async (req, res) => {
// //   try {
// //     const {
// //       title,
// //       type,
// //       status,
// //       category,
// //       politician,
// //       profilePosition,
// //       transitionType,
// //       orientation,
// //       frame,
// //       transitionPlacement,
// //     } = req.body;

// //     if (!title || !type || (!category && !politician)) {
// //       return res.status(400).json({ success: false, message: "Title, Type and either Category or Politician are required" });
// //     }

// //     // Accept file either from local multer or Cloudinary storage middleware
// //     const fileUrl = getFileUrlFromReq(req.file);

// //     // File is optional only in update situations, but create expects file by your earlier logic.
// //     if (!fileUrl) return res.status(400).json({ success: false, message: "File is required" });

// //     let template = await Template.create({
// //       title,
// //       type,
// //       status: status || "active",
// //       category: category || undefined,
// //       politician: politician || undefined,
// //       frame: frame || undefined,
// //       transitionPlacement: transitionPlacement || "below",
// //       profilePosition: profilePosition || "center",
// //       transitionType: transitionType || "fade",
// //       orientation: orientation || "landscape",
// //       file: fileUrl,
// //     });

// //     template = await Template.findById(template._id)
// //       .populate("category")
// //       .populate("politician")
// //       .populate("frame");

// //     res.json({ success: true, template });
// //   } catch (err) {
// //     console.error("❌ Create Template Error:", err);
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // UPDATE template
// // exports.updateTemplate = async (req, res) => {
// //   try {
// //     const {
// //       title,
// //       type,
// //       status,
// //       category,
// //       politician,
// //       profilePosition,
// //       transitionType,
// //       orientation,
// //       frame,
// //       transitionPlacement,
// //     } = req.body;

// //     if (!title || !type || (!category && !politician)) {
// //       return res.status(400).json({ success: false, message: "Title, Type and either Category or Politician are required" });
// //     }

// //     const fileUrl = getFileUrlFromReq(req.file);

// //     const updateBody = {
// //       title,
// //       type,
// //       status,
// //       category: category || undefined,
// //       politician: politician || undefined,
// //       frame: frame || undefined,
// //       transitionPlacement: transitionPlacement || "below",
// //       profilePosition,
// //       transitionType,
// //       orientation,
// //       ...(fileUrl && { file: fileUrl }),
// //     };

// //     const updated = await Template.findByIdAndUpdate(
// //       req.params.id,
// //       updateBody,
// //       { new: true, runValidators: true }
// //     )
// //       .populate("category")
// //       .populate("politician")
// //       .populate("frame");

// //     if (!updated) return res.status(404).json({ success: false, message: "Template not found" });

// //     res.json({ success: true, template: updated });
// //   } catch (err) {
// //     console.error("❌ Update Template Error:", err);
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // DELETE template
// // exports.deleteTemplate = async (req, res) => {
// //   try {
// //     const deleted = await Template.findByIdAndDelete(req.params.id);
// //     if (!deleted) return res.status(404).json({ success: false, message: "Template not found" });
// //     // NOTE: this only deletes DB record. If you want remove file from Cloudinary, use cloudinary.uploader.destroy(public_id)
// //     res.json({ success: true, message: "Template deleted successfully" });
// //   } catch (err) {
// //     console.error("❌ Delete Template Error:", err);
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };
// const Template = require("../models/templateModel");
// const cloudinary = require("../config/cloudinary");

// /**
//  * Utility to extract uploaded file URL and public_id (multer-storage-cloudinary puts path)
//  * Accepts either req.files (fields) or single req.file
//  */
// const extractUploaded = (req, fieldName) => {
//   if (!req) return null;
//   // if using upload.fields => req.files is an object with arrays
//   if (req.files && req.files[fieldName] && req.files[fieldName].length > 0) {
//     const f = req.files[fieldName][0];
//     // multer-storage-cloudinary sets f.path (url) and f.filename or f.public_id may be available
//     // depending on implementation, f.path is safest for URL
//     return {
//       url: f.path || f.secure_url || null,
//       public_id: f.filename || f.public_id || null,
//     };
//   }
//   // single-file (if any)
//   if (req.file && (req.file.fieldname === fieldName)) {
//     const f = req.file;
//     return {
//       url: f.path || f.secure_url || null,
//       public_id: f.filename || f.public_id || null,
//     };
//   }
//   return null;
// };

// // GET all templates
// exports.getTemplates = async (req, res) => {
//   try {
//     const templates = await Template.find()
//       .populate("category")
//       .populate("politician")
//       .populate("frame")
//       .sort({ createdAt: -1 });

//     res.json({ success: true, templates });
//   } catch (err) {
//     console.error("❌ Get Templates Error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // CREATE template
// exports.createTemplate = async (req, res) => {
//   try {
//     const {
//       title,
//       type,
//       status,
//       category,
//       politician,
//       profilePosition,
//       transitionType,
//       orientation,
//       frame, // optional ref
//       transitionPlacement,
//       profileSize,
//       profileShape,
//     } = req.body;

//     if (!title || !type || (!category && !politician)) {
//       return res.status(400).json({ success: false, message: "Title, Type and either Category or Politician are required" });
//     }

//     // extract uploaded file urls/public ids
//     const mainFile = extractUploaded(req, "file");
//     const frameFile = extractUploaded(req, "frameFile");

//     if (!mainFile || !mainFile.url) {
//       return res.status(400).json({ success: false, message: "Main file (file) is required" });
//     }

//     let template = await Template.create({
//       title,
//       type,
//       status: status || "active",
//       category: category || undefined,
//       politician: politician || undefined,
//       frame: frame || undefined,
//       transitionPlacement: transitionPlacement || "below",
//       profilePosition: profilePosition || "center",
//       transitionType: transitionType || "fade",
//       orientation: orientation || "landscape",
//       file: mainFile.url,
//       filePublicId: mainFile.public_id || undefined,
//       frameFile: frameFile?.url || undefined,
//       frameFilePublicId: frameFile?.public_id || undefined,
//       profileSize: profileSize || undefined,
//       profileShape: profileShape || undefined,
//     });

//     template = await Template.findById(template._id)
//       .populate("category")
//       .populate("politician")
//       .populate("frame");

//     res.json({ success: true, template });
//   } catch (err) {
//     console.error("❌ Create Template Error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // UPDATE template
// exports.updateTemplate = async (req, res) => {
//   try {
//     const {
//       title,
//       type,
//       status,
//       category,
//       politician,
//       profilePosition,
//       transitionType,
//       orientation,
//       frame,
//       transitionPlacement,
//       profileSize,
//       profileShape,
//     } = req.body;

//     if (!title || !type || (!category && !politician)) {
//       return res.status(400).json({ success: false, message: "Title, Type and either Category or Politician are required" });
//     }

//     const mainFile = extractUploaded(req, "file");
//     const frameFile = extractUploaded(req, "frameFile");

//     const updateBody = {
//       title,
//       type,
//       status,
//       category: category || undefined,
//       politician: politician || undefined,
//       frame: frame || undefined,
//       transitionPlacement: transitionPlacement || "below",
//       profilePosition,
//       transitionType,
//       orientation,
//       profileSize: profileSize || undefined,
//       profileShape: profileShape || undefined,
//       ...(mainFile && mainFile.url && { file: mainFile.url }),
//       ...(mainFile && mainFile.public_id && { filePublicId: mainFile.public_id }),
//       ...(frameFile && frameFile.url && { frameFile: frameFile.url }),
//       ...(frameFile && frameFile.public_id && { frameFilePublicId: frameFile.public_id }),
//     };

//     const updated = await Template.findByIdAndUpdate(
//       req.params.id,
//       updateBody,
//       { new: true, runValidators: true }
//     )
//       .populate("category")
//       .populate("politician")
//       .populate("frame");

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

//     // OPTIONAL: delete files from Cloudinary if you saved public ids
//     try {
//       if (deleted.filePublicId) {
//         await cloudinary.uploader.destroy(deleted.filePublicId, { resource_type: "auto" });
//       }
//       if (deleted.frameFilePublicId) {
//         await cloudinary.uploader.destroy(deleted.frameFilePublicId, { resource_type: "image" });
//       }
//     } catch (cloudErr) {
//       console.warn("Cloudinary deletion warning:", cloudErr.message || cloudErr);
//       // don't fail the delete operation just because Cloudinary delete failed
//     }

//     res.json({ success: true, message: "Template deleted successfully" });
//   } catch (err) {
//     console.error("❌ Delete Template Error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
const Template = require("../models/templateModel");
const cloudinary = require("../config/cloudinary");

// ✅ Add Template
exports.addTemplate = async (req, res) => {
  try {
    const {
      title,
      type,
      status,
      category,
      politician,
      religious,
      transitionPlacement,
      profilePosition,
      transitionType,
      orientation,
      profileSize,
      profileShape,
    } = req.body;

    let fileUrl = null;
    let frameFileUrl = null;

    if (req.files?.file?.[0]) {
      const uploaded = await cloudinary.uploader.upload(req.files.file[0].path, {
        resource_type: "auto",
        folder: "templates",
      });
      fileUrl = uploaded.secure_url;
    }

    if (req.files?.frameFile?.[0]) {
      const uploadedFrame = await cloudinary.uploader.upload(req.files.frameFile[0].path, {
        resource_type: "image",
        folder: "templates/frames",
      });
      frameFileUrl = uploadedFrame.secure_url;
    }

    const template = await Template.create({
      title,
      type,
      status,
      category: category || null,
      politician: politician || null,
      religious: religious || null,
      transitionPlacement,
      profilePosition,
      transitionType,
      orientation,
      profileSize,
      profileShape,
      file: fileUrl,
      frameFile: frameFileUrl,
    });

    res.status(201).json({ success: true, message: "Template added successfully", template });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all Templates
exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.find()
      .populate("category")
      .populate("politician")
      .populate("religious")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, templates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Template
exports.updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.files?.file?.[0]) {
      const uploaded = await cloudinary.uploader.upload(req.files.file[0].path, {
        resource_type: "auto",
        folder: "templates",
      });
      updateData.file = uploaded.secure_url;
    }

    if (req.files?.frameFile?.[0]) {
      const uploadedFrame = await cloudinary.uploader.upload(req.files.frameFile[0].path, {
        resource_type: "image",
        folder: "templates/frames",
      });
      updateData.frameFile = uploadedFrame.secure_url;
    }

    const updated = await Template.findByIdAndUpdate(id, updateData, { new: true })
      .populate("category")
      .populate("politician")
      .populate("religious");

    if (!updated) return res.status(404).json({ success: false, message: "Template not found" });
    res.status(200).json({ success: true, message: "Template updated successfully", template: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Template
exports.deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Template.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Template not found" });
    res.status(200).json({ success: true, message: "Template deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
