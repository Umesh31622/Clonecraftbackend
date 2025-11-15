// const Template = require("../models/templateModel");
// const Category = require("../models/categoryModel");
// const Politician = require("../models/politicianModel");
// const Religious = require("../models/religiousModel");
// const cloudinary = require("../config/cloudinary");

// const getFileInfo = (filesObj, fieldName) => {
//   if (!filesObj) return null;
//   const arr = filesObj[fieldName];
//   if (!arr || !arr.length) return null;

//   const f = arr[0];

//   return {
//     url: f.path, 
//     public_id: f.filename
//   };
// };

// // ---------------------- GET ALL -----------------------
// exports.getTemplates = async (req, res) => {
//   try {
//     const templates = await Template.find()
//       .populate("category")
//       .populate("politician")
//       .populate("religious")
//       .sort({ createdAt: -1 });

//     return res.json({ success: true, templates });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ---------------------- CREATE -----------------------
// exports.createTemplate = async (req, res) => {
//   try {
//     const body = req.body;

//     const file = getFileInfo(req.files, "file");
//     const frame = getFileInfo(req.files, "frameFile");

//     const doc = {
//       title: body.title,
//       type: body.type,
//       status: body.status,

//       category: body.category || null,
//       politician: body.politician || null,
//       religious: body.religious || null,

//       transitionPlacement: body.transitionPlacement,
//       profilePosition: body.profilePosition,
//       transitionType: body.transitionType,
//       profileSize: body.profileSize,
//       profileShape: body.profileShape,
//       orientation: body.orientation,

//       file: file?.url || null,
//       filePublicId: file?.public_id || null,

//       frameFile: frame?.url || null,
//       frameFilePublicId: frame?.public_id || null,
//     };

//     const saved = await Template.create(doc);

//     const populated = await Template.findById(saved._id)
//       .populate("category")
//       .populate("politician")
//       .populate("religious");

//     res.json({ success: true, template: populated });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ---------------------- UPDATE -----------------------
// exports.updateTemplate = async (req, res) => {
//   try {
//     const body = req.body;
//     const id = req.params.id;

//     const file = getFileInfo(req.files, "file");
//     const frame = getFileInfo(req.files, "frameFile");

//     if (file) {
//       body.file = file.url;
//       body.filePublicId = file.public_id;
//     }

//     if (frame) {
//       body.frameFile = frame.url;
//       body.frameFilePublicId = frame.public_id;
//     }

//     const updated = await Template.findByIdAndUpdate(id, body, { new: true })
//       .populate("category")
//       .populate("politician")
//       .populate("religious");

//     res.json({ success: true, template: updated });

//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ---------------------- DELETE -----------------------
// exports.deleteTemplate = async (req, res) => {
//   try {
//     const id = req.params.id;

//     await Template.findByIdAndDelete(id);

//     res.json({ success: true });

//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ---------------------- STATUS -----------------------
// exports.updateStatus = async (req, res) => {
//   try {
//     const updated = await Template.findByIdAndUpdate(
//       req.params.id,
//       { status: req.body.status },
//       { new: true }
//     );

//     res.json({ success: true, updated });

//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ---------------------- BULK DELETE -----------------------
// exports.bulkDeleteTemplates = async (req, res) => {
//   try {
//     await Template.deleteMany({ _id: { $in: req.body.ids } });

//     res.json({ success: true });

//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ---------------------- IMPORT CSV -----------------------
// exports.importTemplatesFromCsv = async (req, res) => {
//   try {
//     const rows = req.body;

//     let created = 0;

//     for (const r of rows) {
//       const title = r.title?.trim();
//       if (!title) continue;

//       let categoryId = null,
//         politicianId = null,
//         religiousId = null;

//       if (r.parent) {
//         const name = r.parent.trim();

//         const c = await Category.findOne({ title: name });
//         if (c) categoryId = c._id;

//         const p = await Politician.findOne({ title: name });
//         if (p) politicianId = p._id;

//         const rObj = await Religious.findOne({ title: name });
//         if (rObj) religiousId = rObj._id;
//       }

//       await Template.create({
//         title,
//         type: r.type || "video",
//         status: r.status || "active",
//         file: r.file || "",
//         frameFile: r.frameFile || "",
//         category: categoryId,
//         politician: politicianId,
//         religious: religiousId
//       });

//       created++;
//     }

//     res.json({ success: true, created });

//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

const Template = require("../models/templateModel");
const Category = require("../models/categoryModel");
const Politician = require("../models/politicianModel");
const Religious = require("../models/religiousModel");
const cloudinary = require("../config/cloudinary");

// helper to normalize uploaded file object returned by multer-storage-cloudinary
const getFileInfo = (filesObj, fieldName) => {
  if (!filesObj) return null;
  const arr = filesObj[fieldName];
  if (!arr || !arr.length) return null;
  const f = arr[0];
  return {
    url: f.path,
    public_id: f.filename
  };
};

// helper: ensure only one parent is set and empty strings become null
const sanitizeParents = (obj) => {
  const result = { ...obj };
  // convert empty strings to null
  ["category","politician","religious"].forEach(k => {
    if (result[k] === "") result[k] = null;
  });
  // if multiple provided, prefer explicit non-null in order: category -> politician -> religious
  // (frontend ensures only one is sent, but just in case)
  if (result.category) {
    result.politician = null;
    result.religious = null;
  } else if (result.politician) {
    result.category = null;
    result.religious = null;
  } else if (result.religious) {
    result.category = null;
    result.politician = null;
  }
  return result;
};

// ---------------------- GET ALL -----------------------
exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.find()
      .populate("category")
      .populate("politician")
      .populate("religious")
      .sort({ createdAt: -1 });

    return res.json({ success: true, templates });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------------- CREATE -----------------------
exports.createTemplate = async (req, res) => {
  try {
    const body = req.body || {};

    // files if uploaded
    const file = getFileInfo(req.files, "file");
    const frame = getFileInfo(req.files, "frameFile");

    // sanitize parent fields and ensure only one parent kept
    const sanitized = sanitizeParents(body);

    const doc = {
      title: sanitized.title,
      type: sanitized.type || "video",
      status: sanitized.status || "active",

      category: sanitized.category || null,
      politician: sanitized.politician || null,
      religious: sanitized.religious || null,

      transitionPlacement: sanitized.transitionPlacement,
      profilePosition: sanitized.profilePosition,
      transitionType: sanitized.transitionType,
      profileSize: sanitized.profileSize,
      profileShape: sanitized.profileShape,
      orientation: sanitized.orientation,

      file: file?.url || (sanitized.file || null),
      filePublicId: file?.public_id || sanitized.filePublicId || null,

      frameFile: frame?.url || (sanitized.frameFile || null),
      frameFilePublicId: frame?.public_id || sanitized.frameFilePublicId || null,
    };

    const saved = await Template.create(doc);

    const populated = await Template.findById(saved._id)
      .populate("category")
      .populate("politician")
      .populate("religious");

    res.json({ success: true, template: populated });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------------- UPDATE -----------------------
exports.updateTemplate = async (req, res) => {
  try {
    const body = req.body || {};
    const id = req.params.id;

    // get uploaded files if any
    const file = getFileInfo(req.files, "file");
    const frame = getFileInfo(req.files, "frameFile");

    // start with body but don't directly use it without sanitizing
    let updateBody = { ...body };

    // if files uploaded, set their url/public id
    if (file) {
      updateBody.file = file.url;
      updateBody.filePublicId = file.public_id;
    }
    if (frame) {
      updateBody.frameFile = frame.url;
      updateBody.frameFilePublicId = frame.public_id;
    }

    // sanitize parents (ensure null instead of empty string, only one parent kept)
    updateBody = sanitizeParents(updateBody);

    // ensure mongoose gets null instead of empty string for parent fields
    // findByIdAndUpdate will set fields accordingly
    const updated = await Template.findByIdAndUpdate(id, updateBody, { new: true })
      .populate("category")
      .populate("politician")
      .populate("religious");

    res.json({ success: true, template: updated });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------------- DELETE -----------------------
exports.deleteTemplate = async (req, res) => {
  try {
    const id = req.params.id;

    await Template.findByIdAndDelete(id);

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------------- STATUS -----------------------
exports.updateStatus = async (req, res) => {
  try {
    const updated = await Template.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json({ success: true, updated });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------------- BULK DELETE -----------------------
exports.bulkDeleteTemplates = async (req, res) => {
  try {
    await Template.deleteMany({ _id: { $in: req.body.ids } });

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------------- IMPORT CSV -----------------------
/**
 * Accepts an array of rows (objects). Rows are expected to contain the fields exported by frontend:
 * title, type, status, parentType, parent, file, frameFile,
 * transitionPlacement, profilePosition, transitionType, orientation, profileSize, profileShape
 *
 * This will attempt to find matching parent by title/name in Category, Politician or Religious collections.
 */
exports.importTemplatesFromCsv = async (req, res) => {
  try {
    const rows = Array.isArray(req.body) ? req.body : [];

    let created = 0;

    for (const r of rows) {
      const title = (r.title || "").toString().trim();
      if (!title) continue;

      // default parent ids
      let categoryId = null,
        politicianId = null,
        religiousId = null;

      // If CSV provides parentType + parent name, use that; else try to infer using the "parent" column
      const parentName = (r.parent || "").toString().trim();
      const parentType = (r.parentType || "").toString().trim();

      if (parentType) {
        if (parentType === "Category" && parentName) {
          const c = await Category.findOne({ $or: [{ title: parentName }, { name: parentName }] });
          if (c) categoryId = c._id;
        }
        if (parentType === "Politician" && parentName) {
          const p = await Politician.findOne({ $or: [{ title: parentName }, { name: parentName }] });
          if (p) politicianId = p._id;
        }
        if (parentType === "Religious" && parentName) {
          const rObj = await Religious.findOne({ $or: [{ title: parentName }, { name: parentName }] });
          if (rObj) religiousId = rObj._id;
        }
      } else if (parentName) {
        // try to find by name/title in any collection
        const c = await Category.findOne({ $or: [{ title: parentName }, { name: parentName }] });
        if (c) categoryId = c._id;
        const p = await Politician.findOne({ $or: [{ title: parentName }, { name: parentName }] });
        if (p) politicianId = p._id;
        const rObj = await Religious.findOne({ $or: [{ title: parentName }, { name: parentName }] });
        if (rObj) religiousId = rObj._id;
      }

      // Build template doc using all importable fields
      const doc = {
        title,
        type: r.type || "video",
        status: r.status || "active",
        file: r.file || "",
        frameFile: r.frameFile || "",
        category: categoryId,
        politician: politicianId,
        religious: religiousId,
        transitionPlacement: r.transitionPlacement || undefined,
        profilePosition: r.profilePosition || undefined,
        transitionType: r.transitionType || undefined,
        orientation: r.orientation || undefined,
        profileSize: r.profileSize || undefined,
        profileShape: r.profileShape || undefined
      };

      await Template.create(doc);
      created++;
    }

    res.json({ success: true, created });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};



