const MyCreation = require("../models/MyCreation");
const cloudinary = require("../config/cloudinary");

// helper
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

// 🔹 Create new MyCreation (User upload)
exports.createMyCreation = async (req, res) => {
  try {
    const { user, title, description, type, category, orientation, profilePosition, transitionType } = req.body;
    if (!user || !title)
      return res.status(400).json({ success: false, message: "User and title are required" });

    const mainFile = getFileInfo(req.files, "file");
    const frameFile = getFileInfo(req.files, "frameFile");

    const creation = await MyCreation.create({
      user,
      title,
      description,
      type,
      category,
      orientation,
      profilePosition,
      transitionType,
      file: mainFile?.url,
      filePublicId: mainFile?.public_id,
      frameFile: frameFile?.url,
      frameFilePublicId: frameFile?.public_id,
    });

    const populated = await MyCreation.findById(creation._id).populate("user").populate("category");
    res.status(201).json({ success: true, creation: populated });
  } catch (err) {
    console.error("Create MyCreation Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔹 Get all MyCreations (Admin view)
exports.getAllMyCreations = async (req, res) => {
  try {
    const creations = await MyCreation.find()
      .populate("user")
      .populate("category")
      .sort({ createdAt: -1 });
    res.json({ success: true, creations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔹 Get approved creations (Public)
exports.getApprovedCreations = async (req, res) => {
  try {
    const creations = await MyCreation.find({ status: "approved" })
      .populate("user")
      .populate("category")
      .sort({ createdAt: -1 });
    res.json({ success: true, creations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔹 Admin approve/reject
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminComment } = req.body;

    if (!["approved", "rejected"].includes(status))
      return res.status(400).json({ success: false, message: "Invalid status" });

    const updated = await MyCreation.findByIdAndUpdate(
      id,
      { status, adminComment },
      { new: true }
    )
      .populate("user")
      .populate("category");

    if (!updated) return res.status(404).json({ success: false, message: "Creation not found" });
    res.json({ success: true, creation: updated });
  } catch (err) {
    console.error("Update MyCreation Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔹 Delete creation
exports.deleteMyCreation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await MyCreation.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });

    try {
      if (deleted.filePublicId)
        await cloudinary.uploader.destroy(deleted.filePublicId, { resource_type: "auto" });
      if (deleted.frameFilePublicId)
        await cloudinary.uploader.destroy(deleted.frameFilePublicId, { resource_type: "image" });
    } catch (err) {
      console.warn("Cloudinary cleanup failed:", err.message);
    }

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
