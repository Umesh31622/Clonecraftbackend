
// const Template = require("../models/templateModel");
// const cloudinary = require("../config/cloudinary");

// /**
//  * helper to read uploaded file info from multer-storage-cloudinary or a regular multer + uploader
//  * multer-storage-cloudinary returns file.path (url) and file.filename (public id) typically
//  */
// const getFileInfo = (filesObj, fieldName) => {
//   if (!filesObj) return null;
//   const arr = filesObj[fieldName];
//   if (!arr || !arr.length) return null;
//   const f = arr[0];
//   return {
//     url: f.path || f.secure_url || f.url || null,
//     public_id: f.filename || f.public_id || f.publicId || null,
//   };
// };

// exports.getTemplates = async (req, res) => {
//   try {
//     let { page = 1, limit = 10, search = "" } = req.query;
//     page = Number(page);
//     limit = Number(limit);
//     const skip = (page - 1) * limit;

//     const query = {};
//     if (search && search.trim() !== "") {
//       query.title = { $regex: search, $options: "i" };
//     }

//     const [templates, total] = await Promise.all([
//       Template.find(query)
//         .populate("category")
//         .populate("politician")
//         .populate("religious")
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(limit),
//       Template.countDocuments(query),
//     ]);

//     return res.json({
//       success: true,
//       templates,
//       total,
//       page,
//       pages: Math.ceil(total / limit) || 1,
//     });
//   } catch (err) {
//     console.error("Get Templates Error:", err);
//     return res.status(500).json({ success: false, message: err.message });
//   }
// };

// exports.createTemplate = async (req, res) => {
//   try {
//     const {
//       title,
//       type,
//       status,
//       category,
//       politician,
//       religious,
//       transitionPlacement,
//       profilePosition,
//       transitionType,
//       orientation,
//       profileSize,
//       profileShape,
//     } = req.body;

//     if (!title) return res.status(400).json({ success: false, message: "Title required" });

//     // get file info (works with multer-storage-cloudinary or multer + manual upload)
//     const mainFile = getFileInfo(req.files, "file");
//     const frameFile = getFileInfo(req.files, "frameFile");

//     const tpl = await Template.create({
//       title,
//       type: type || "video",
//       status: status || "active",
//       category: category || null,
//       politician: politician || null,
//       religious: religious || null,
//       transitionPlacement: transitionPlacement || "below",
//       profilePosition: profilePosition || "center",
//       transitionType: transitionType || "fade",
//       orientation: orientation || "landscape",
//       profileSize: profileSize || "",
//       profileShape: profileShape || "circle",
//       file: mainFile?.url || null,
//       filePublicId: mainFile?.public_id || null,
//       frameFile: frameFile?.url || null,
//       frameFilePublicId: frameFile?.public_id || null,
//     });

//     const populated = await Template.findById(tpl._id)
//       .populate("category")
//       .populate("politician")
//       .populate("religious");

//     return res.status(201).json({ success: true, template: populated });
//   } catch (err) {
//     console.error("Create Template Error:", err);
//     return res.status(500).json({ success: false, message: err.message });
//   }
// };

// exports.updateTemplate = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const body = { ...req.body };

//     const mainFile = getFileInfo(req.files, "file");
//     const frameFile = getFileInfo(req.files, "frameFile");

//     if (mainFile?.url) {
//       body.file = mainFile.url;
//       if (mainFile.public_id) body.filePublicId = mainFile.public_id;
//     }
//     if (frameFile?.url) {
//       body.frameFile = frameFile.url;
//       if (frameFile.public_id) body.frameFilePublicId = frameFile.public_id;
//     }

//     const updated = await Template.findByIdAndUpdate(id, body, { new: true, runValidators: true })
//       .populate("category")
//       .populate("politician")
//       .populate("religious");

//     if (!updated) return res.status(404).json({ success: false, message: "Template not found" });
//     return res.json({ success: true, template: updated });
//   } catch (err) {
//     console.error("Update Template Error:", err);
//     return res.status(500).json({ success: false, message: err.message });
//   }
// };

// exports.deleteTemplate = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Template.findByIdAndDelete(id);
//     if (!deleted) return res.status(404).json({ success: false, message: "Template not found" });

//     // try to cleanup cloudinary if public ids exist
//     try {
//       if (deleted.filePublicId) {
//         await cloudinary.uploader.destroy(deleted.filePublicId, { resource_type: "auto" });
//       }
//       if (deleted.frameFilePublicId) {
//         await cloudinary.uploader.destroy(deleted.frameFilePublicId, { resource_type: "image" });
//       }
//     } catch (cloudErr) {
//       console.warn("Cloudinary cleanup failed:", cloudErr.message || cloudErr);
//     }

//     return res.json({ success: true, message: "Template deleted" });
//   } catch (err) {
//     console.error("Delete Template Error:", err);
//     return res.status(500).json({ success: false, message: err.message });
//   }
// };
// controllers/templateController.js
const Template = require("../models/templateModel");
const cloudinary = require("../config/cloudinary");

// helper to read uploaded file info from multer-storage-cloudinary
const getFileInfo = (filesObj, fieldName) => {
  if (!filesObj) return null;
  const arr = filesObj[fieldName];
  if (!arr || !arr.length) return null;
  const f = arr[0];
  return {
    url: f.path || f.secure_url || f.url || null,
    public_id: f.filename || f.public_id || f.publicId || null,
  };
};

const Category = require("../models/categoryModel");
const Politician = require("../models/politicianModel");
const Religious = require("../models/religiousModel");

exports.getTemplates = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "" } = req.query;
    page = Number(page);
    limit = Number(limit);
    const skip = (page - 1) * limit;

    const query = {};
    if (search && search.trim() !== "") {
      query.title = { $regex: search, $options: "i" };
    }

    const [templates, total] = await Promise.all([
      Template.find(query)
        .populate("category")
        .populate("politician")
        .populate("religious")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Template.countDocuments(query),
    ]);

    return res.json({
      success: true,
      templates,
      total,
      page,
      pages: Math.max(1, Math.ceil(total / limit)),
    });
  } catch (err) {
    console.error("Get Templates Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.createTemplate = async (req, res) => {
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

    if (!title) return res.status(400).json({ success: false, message: "Title required" });

    const mainFile = getFileInfo(req.files, "file");
    const frameFile = getFileInfo(req.files, "frameFile");

    const tpl = await Template.create({
      title,
      type: type || "video",
      status: status || "active",
      category: category || null,
      politician: politician || null,
      religious: religious || null,
      transitionPlacement: transitionPlacement || "below",
      profilePosition: profilePosition || "center",
      transitionType: transitionType || "fade",
      orientation: orientation || "landscape",
      profileSize: profileSize || "",
      profileShape: profileShape || "circle",
      file: mainFile?.url || null,
      filePublicId: mainFile?.public_id || null,
      frameFile: frameFile?.url || null,
      frameFilePublicId: frameFile?.public_id || null,
    });

    const populated = await Template.findById(tpl._id)
      .populate("category")
      .populate("politician")
      .populate("religious");

    return res.status(201).json({ success: true, template: populated });
  } catch (err) {
    console.error("Create Template Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const body = { ...req.body };

    const mainFile = getFileInfo(req.files, "file");
    const frameFile = getFileInfo(req.files, "frameFile");

    if (mainFile?.url) {
      body.file = mainFile.url;
      if (mainFile.public_id) body.filePublicId = mainFile.public_id;
    }
    if (frameFile?.url) {
      body.frameFile = frameFile.url;
      if (frameFile.public_id) body.frameFilePublicId = frameFile.public_id;
    }

    const updated = await Template.findByIdAndUpdate(id, body, { new: true, runValidators: true })
      .populate("category")
      .populate("politician")
      .populate("religious");

    if (!updated) return res.status(404).json({ success: false, message: "Template not found" });
    return res.json({ success: true, template: updated });
  } catch (err) {
    console.error("Update Template Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Template.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Template not found" });

    // cleanup cloudinary if public ids exist
    try {
      if (deleted.filePublicId) await cloudinary.uploader.destroy(deleted.filePublicId, { resource_type: "auto" });
      if (deleted.frameFilePublicId) await cloudinary.uploader.destroy(deleted.frameFilePublicId, { resource_type: "image" });
    } catch (cloudErr) {
      console.warn("Cloudinary cleanup failed:", cloudErr.message || cloudErr);
    }

    return res.json({ success: true, message: "Template deleted" });
  } catch (err) {
    console.error("Delete Template Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// BULK DELETE
exports.bulkDeleteTemplates = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) return res.status(400).json({ success: false, message: "No ids provided" });

    // fetch documents to cleanup cloudinary
    const docs = await Template.find({ _id: { $in: ids } });
    await Template.deleteMany({ _id: { $in: ids } });

    // try cleanup cloudinary
    for (const d of docs) {
      try {
        if (d.filePublicId) await cloudinary.uploader.destroy(d.filePublicId, { resource_type: "auto" });
        if (d.frameFilePublicId) await cloudinary.uploader.destroy(d.frameFilePublicId, { resource_type: "image" });
      } catch (e) {
        console.warn("Cloudinary cleanup error:", e.message || e);
      }
    }

    return res.json({ success: true, deleted: ids.length });
  } catch (err) {
    console.error("Bulk Delete Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// IMPORT CSV (expects array of objects in req.body)
exports.importTemplatesFromCsv = async (req, res) => {
  try {
    const rows = req.body;
    if (!Array.isArray(rows) || rows.length === 0) return res.status(400).json({ success: false, message: "No rows provided" });

    const created = [];
    for (const r of rows) {
      // map CSV fields: allow parent by name -> resolve to ids if possible
      const title = r.title || r.Title || "";
      if (!title) continue;

      const type = r.type || r.Type || "video";
      const status = r.status || r.Status || "active";
      const profilePosition = r.profilePosition || r.profile_position || "";
      const profileSize = r.profileSize || r.profile_size || "";
      const profileShape = r.profileShape || r.profile_shape || "";
      const transitionPlacement = r.transitionPlacement || r.transition_placement || "below";
      const transitionType = r.transitionType || r.transition_type || "fade";
      const orientation = r.orientation || "landscape";

      let categoryId = null;
      let politicianId = null;
      let religiousId = null;

      const parentVal = (r.parent || r.Parent || "").trim();
      if (parentVal) {
        // try find in categories -> politicians -> religious by title/name
        const cat = await Category.findOne({ $or: [{ title: parentVal }, { name: parentVal }] }).lean();
        if (cat) categoryId = cat._id;
        else {
          const pol = await Politician.findOne({ $or: [{ title: parentVal }, { name: parentVal }] }).lean();
          if (pol) politicianId = pol._id;
          else {
            const rel = await Religious.findOne({ $or: [{ title: parentVal }, { name: parentVal }] }).lean();
            if (rel) religiousId = rel._id;
          }
        }
      }

      const doc = {
        title,
        type,
        status,
        category: categoryId,
        politician: politicianId,
        religious: religiousId,
        profilePosition,
        profileSize,
        profileShape,
        transitionPlacement,
        transitionType,
        orientation,
      };

      const createdTpl = await Template.create(doc);
      created.push(createdTpl);
    }

    return res.json({ success: true, created: created.length });
  } catch (err) {
    console.error("Import Templates Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
