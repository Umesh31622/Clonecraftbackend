
// const Template = require("../models/templateModel");
// const cloudinary = require("../config/cloudinary");

// const Category = require("../models/categoryModel");
// const Politician = require("../models/politicianModel");
// const Religious = require("../models/religiousModel");

// // helper to read uploaded file info from multer-storage-cloudinary
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
//     if (!limit || limit <= 0) limit = 10;
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
//       pages: Math.max(1, Math.ceil(total / limit)),
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
//       file: mainFile?.url || req.body.file || null,            // accept multer URL or direct URL
//       filePublicId: mainFile?.public_id || null,
//       frameFile: frameFile?.url || req.body.frameFile || null, // accept multer URL or direct URL
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

//     // allow updating status via body, parent ids etc.
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

//     // cleanup cloudinary if public ids exist
//     try {
//       if (deleted.filePublicId) await cloudinary.uploader.destroy(deleted.filePublicId, { resource_type: "auto" });
//       if (deleted.frameFilePublicId) await cloudinary.uploader.destroy(deleted.frameFilePublicId, { resource_type: "image" });
//     } catch (cloudErr) {
//       console.warn("Cloudinary cleanup failed:", cloudErr.message || cloudErr);
//     }

//     return res.json({ success: true, message: "Template deleted" });
//   } catch (err) {
//     console.error("Delete Template Error:", err);
//     return res.status(500).json({ success: false, message: err.message });
//   }
// };

// // PATCH /:id/status
// exports.updateStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;
//     if (!["active", "inactive"].includes(status)) return res.status(400).json({ success: false, message: "Invalid status" });

//     const updated = await Template.findByIdAndUpdate(id, { status }, { new: true })
//       .populate("category")
//       .populate("politician")
//       .populate("religious");

//     if (!updated) return res.status(404).json({ success: false, message: "Template not found" });
//     return res.json({ success: true, template: updated });
//   } catch (err) {
//     console.error("Update status error", err);
//     return res.status(500).json({ success: false, message: err.message });
//   }
// };

// // BULK DELETE
// exports.bulkDeleteTemplates = async (req, res) => {
//   try {
//     const { ids } = req.body;
//     if (!Array.isArray(ids) || ids.length === 0) return res.status(400).json({ success: false, message: "No ids provided" });

//     const docs = await Template.find({ _id: { $in: ids } });
//     await Template.deleteMany({ _id: { $in: ids } });

//     for (const d of docs) {
//       try {
//         if (d.filePublicId) await cloudinary.uploader.destroy(d.filePublicId, { resource_type: "auto" });
//         if (d.frameFilePublicId) await cloudinary.uploader.destroy(d.frameFilePublicId, { resource_type: "image" });
//       } catch (e) {
//         console.warn("Cloudinary cleanup error:", e.message || e);
//       }
//     }

//     return res.json({ success: true, deleted: ids.length });
//   } catch (err) {
//     console.error("Bulk Delete Error:", err);
//     return res.status(500).json({ success: false, message: err.message });
//   }
// };

// // IMPORT CSV (accepts parsed array of objects in req.body)
// // expects fields: title,type,status,file,frameFile,parent,profilePosition,profileSize,profileShape,transitionPlacement,transitionType,orientation
// exports.importTemplatesFromCsv = async (req, res) => {
//   try {
//     const rows = req.body;
//     if (!Array.isArray(rows) || rows.length === 0) return res.status(400).json({ success: false, message: "No rows provided" });

//     const created = [];
//     for (const r of rows) {
//       const title = (r.title || r.Title || "").trim();
//       if (!title) continue;

//       const type = (r.type || r.Type || "video").trim();
//       const status = (r.status || r.Status || "active").trim();
//       const profilePosition = (r.profilePosition || r.profile_position || "").trim();
//       const profileSize = (r.profileSize || r.profile_size || "").trim();
//       const profileShape = (r.profileShape || r.profile_shape || "").trim();
//       const transitionPlacement = (r.transitionPlacement || r.transition_placement || "below").trim();
//       const transitionType = (r.transitionType || r.transition_type || "fade").trim();
//       const orientation = (r.orientation || "landscape").trim();

//       // parent mapping by name
//       let categoryId = null, politicianId = null, religiousId = null;
//       const parentVal = (r.parent || r.Parent || "").trim();
//       if (parentVal) {
//         const cat = await Category.findOne({ $or: [{ title: parentVal }, { name: parentVal }] }).lean();
//         if (cat) categoryId = cat._id;
//         else {
//           const pol = await Politician.findOne({ $or: [{ title: parentVal }, { name: parentVal }] }).lean();
//           if (pol) politicianId = pol._id;
//           else {
//             const rel = await Religious.findOne({ $or: [{ title: parentVal }, { name: parentVal }] }).lean();
//             if (rel) religiousId = rel._id;
//           }
//         }
//       }

//       const doc = {
//         title,
//         type,
//         status,
//         category: categoryId,
//         politician: politicianId,
//         religious: religiousId,
//         profilePosition,
//         profileSize,
//         profileShape,
//         transitionPlacement,
//         transitionType,
//         orientation,
//         file: r.file || r.file_url || r.fileUrl || null,
//         frameFile: r.frameFile || r.frame_file || r.frame_file_url || null,
//       };

//       const tpl = await Template.create(doc);
//       created.push(tpl);
//     }

//     return res.json({ success: true, created: created.length });
//   } catch (err) {
//     console.error("Import Templates Error:", err);
//     return res.status(500).json({ success: false, message: err.message });
//   }
// };
const Template = require("../models/templateModel");
const cloudinary = require("../config/cloudinary");

const Category = require("../models/categoryModel");
const Politician = require("../models/politicianModel");
const Religious = require("../models/religiousModel");

// helper for multer storage
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

/* -------------------------------
   GET TEMPLATES
--------------------------------*/
exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.find({})
      .populate("category")
      .populate("politician")
      .populate("religious")
      .sort({ createdAt: -1 });

    return res.json({ success: true, templates });
  } catch (err) {
    console.error("Get Templates Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* -------------------------------
   CREATE TEMPLATE
--------------------------------*/
exports.createTemplate = async (req, res) => {
  try {
    const {
      title,
      type,
      status,
      parentType,
      parentId,
      transitionPlacement,
      profilePosition,
      transitionType,
      orientation,
      profileSize,
      profileShape
    } = req.body;

    if (!title) return res.status(400).json({ success: false, message: "Title required" });

    // Assign parent based on parentType
    let category = null, politician = null, religious = null;

    if (parentType === "Category") category = parentId;
    if (parentType === "Politician") politician = parentId;
    if (parentType === "Religious") religious = parentId;

    // handle files
    const mainFile = getFileInfo(req.files, "file");
    const frameFile = getFileInfo(req.files, "frameFile");

    const tpl = await Template.create({
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

      file: mainFile?.url || null,
      filePublicId: mainFile?.public_id || null,

      frameFile: frameFile?.url || null,
      frameFilePublicId: frameFile?.public_id || null
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

/* -------------------------------
   UPDATE TEMPLATE
--------------------------------*/
exports.updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      type,
      status,
      parentType,
      parentId,
      transitionPlacement,
      profilePosition,
      transitionType,
      orientation,
      profileSize,
      profileShape
    } = req.body;

    // decide parent
    let category = null, politician = null, religious = null;

    if (parentType === "Category") category = parentId;
    if (parentType === "Politician") politician = parentId;
    if (parentType === "Religious") religious = parentId;

    const updateData = {
      title,
      type,
      status,
      transitionPlacement,
      profilePosition,
      transitionType,
      orientation,
      profileSize,
      profileShape,
      category,
      politician,
      religious
    };

    // update files if new file uploaded
    const mainFile = getFileInfo(req.files, "file");
    if (mainFile?.url) {
      updateData.file = mainFile.url;
      updateData.filePublicId = mainFile.public_id;
    }

    const frameFile = getFileInfo(req.files, "frameFile");
    if (frameFile?.url) {
      updateData.frameFile = frameFile.url;
      updateData.frameFilePublicId = frameFile.public_id;
    }

    const updated = await Template.findByIdAndUpdate(id, updateData, { new: true })
      .populate("category")
      .populate("politician")
      .populate("religious");

    return res.json({ success: true, template: updated });

  } catch (err) {
    console.error("Update Template Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* -------------------------------
   DELETE TEMPLATE
--------------------------------*/
exports.deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Template.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });

    try {
      if (deleted.filePublicId)
        await cloudinary.uploader.destroy(deleted.filePublicId, { resource_type: "auto" });

      if (deleted.frameFilePublicId)
        await cloudinary.uploader.destroy(deleted.frameFilePublicId, { resource_type: "image" });
    } catch (err) {}

    return res.json({ success: true, message: "Deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* -------------------------------
   STATUS UPDATE
--------------------------------*/
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Template.findByIdAndUpdate(id, { status }, { new: true })
      .populate("category")
      .populate("politician")
      .populate("religious");

    return res.json({ success: true, template: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* -------------------------------
   BULK DELETE
--------------------------------*/
exports.bulkDeleteTemplates = async (req, res) => {
  try {
    const { ids } = req.body;

    await Template.deleteMany({ _id: { $in: ids } });

    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* -------------------------------
   IMPORT CSV (parent mapping fixed)
--------------------------------*/
exports.importTemplatesFromCsv = async (req, res) => {
  try {
    const rows = req.body;
    const created = [];

    for (const r of rows) {
      const title = r.title?.trim();
      if (!title) continue;

      let category = null,
        politician = null,
        religious = null;

      const parentName = (r.parent || "").trim();

      if (parentName) {
        const cat = await Category.findOne({ title: parentName });
        if (cat) category = cat._id;

        const pol = await Politician.findOne({ title: parentName });
        if (pol) politician = pol._id;

        const rel = await Religious.findOne({ title: parentName });
        if (rel) religious = rel._id;
      }

      const tpl = await Template.create({
        title,
        type: r.type || "video",
        status: r.status || "active",
        category,
        politician,
        religious,
        file: r.file || null,
        frameFile: r.frameFile || null
      });

      created.push(tpl);
    }

    return res.json({ success: true, created: created.length });
  } catch (err) {
    console.error("IMPORT ERR", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};


