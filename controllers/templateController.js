const Template = require("../models/templateModel");
const Category = require("../models/categoryModel");
const Politician = require("../models/politicianModel");
const Religious = require("../models/religiousModel");
const cloudinary = require("../config/cloudinary");

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
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------------- CREATE -----------------------
exports.createTemplate = async (req, res) => {
  try {
    const body = req.body;

    const file = getFileInfo(req.files, "file");
    const frame = getFileInfo(req.files, "frameFile");

    const doc = {
      title: body.title,
      type: body.type,
      status: body.status,

      category: body.category || null,
      politician: body.politician || null,
      religious: body.religious || null,

      transitionPlacement: body.transitionPlacement,
      profilePosition: body.profilePosition,
      transitionType: body.transitionType,
      profileSize: body.profileSize,
      profileShape: body.profileShape,
      orientation: body.orientation,

      file: file?.url || null,
      filePublicId: file?.public_id || null,

      frameFile: frame?.url || null,
      frameFilePublicId: frame?.public_id || null,
    };

    const saved = await Template.create(doc);

    const populated = await Template.findById(saved._id)
      .populate("category")
      .populate("politician")
      .populate("religious");

    res.json({ success: true, template: populated });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------------- UPDATE -----------------------
exports.updateTemplate = async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;

    const file = getFileInfo(req.files, "file");
    const frame = getFileInfo(req.files, "frameFile");

    if (file) {
      body.file = file.url;
      body.filePublicId = file.public_id;
    }

    if (frame) {
      body.frameFile = frame.url;
      body.frameFilePublicId = frame.public_id;
    }

    const updated = await Template.findByIdAndUpdate(id, body, { new: true })
      .populate("category")
      .populate("politician")
      .populate("religious");

    res.json({ success: true, template: updated });

  } catch (err) {
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
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------------- BULK DELETE -----------------------
exports.bulkDeleteTemplates = async (req, res) => {
  try {
    await Template.deleteMany({ _id: { $in: req.body.ids } });

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------------- IMPORT CSV -----------------------
exports.importTemplatesFromCsv = async (req, res) => {
  try {
    const rows = req.body;

    let created = 0;

    for (const r of rows) {
      const title = r.title?.trim();
      if (!title) continue;

      let categoryId = null,
        politicianId = null,
        religiousId = null;

      if (r.parent) {
        const name = r.parent.trim();

        const c = await Category.findOne({ title: name });
        if (c) categoryId = c._id;

        const p = await Politician.findOne({ title: name });
        if (p) politicianId = p._id;

        const rObj = await Religious.findOne({ title: name });
        if (rObj) religiousId = rObj._id;
      }

      await Template.create({
        title,
        type: r.type || "video",
        status: r.status || "active",
        file: r.file || "",
        frameFile: r.frameFile || "",
        category: categoryId,
        politician: politicianId,
        religious: religiousId
      });

      created++;
    }

    res.json({ success: true, created });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


