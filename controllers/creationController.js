// controllers/creationController.js
const Creation = require("../models/creationModel");
const cloudinary = require("../config/cloudinary");

// Create (upload) a new creation
exports.createCreation = async (req, res) => {
  try {
    // assuming auth middleware set req.user._id
    const userId = req.user?._id || req.body.user || null;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    if (!req.file) return res.status(400).json({ success: false, message: "File is required" });

    // multer-storage-cloudinary exposes file.path or file.secure_url and file.filename/public_id etc.
    // depending on setup, multer-storage-cloudinary sets file.path to the URL and file.filename to public id sometimes.
    const fileUrl = req.file.path || req.file.secure_url || req.file?.url;
    const publicId = (req.file && (req.file.filename || req.file.public_id)) || null;

    // Determine resource type from mimetype
    const mimetype = req.file.mimetype || "";
    const resourceType = mimetype.startsWith("video") ? "video" : "image";
    const fileType = resourceType;

    if (!fileUrl || !publicId) {
      // Fallback: if cloudinary storage used differently, try req.file.metadata etc.
      console.warn("Upload: fileUrl or publicId missing. req.file:", req.file);
    }

    const creation = await Creation.create({
      user: userId,
      title: req.body.title || "",
      description: req.body.description || "",
      fileUrl,
      fileType,
      publicId,
      resourceType,
    });

    return res.status(201).json({ success: true, creation });
  } catch (err) {
    console.error("Create creation error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get user's creations (paginated optional)
exports.getCreations = async (req, res) => {
  try {
    const userId = req.user?._id || req.query.user || null;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const page = parseInt(req.query.page || "1");
    const limit = Math.min(parseInt(req.query.limit || "50"), 200);

    const skip = (page - 1) * limit;
    const total = await Creation.countDocuments({ user: userId });
    const creations = await Creation.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.json({ success: true, total, page, limit, creations });
  } catch (err) {
    console.error("Get creations error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete creation (and Cloudinary resource)
exports.deleteCreation = async (req, res) => {
  try {
    const userId = req.user?._id || null;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const { id } = req.params;
    const creation = await Creation.findById(id);
    if (!creation) return res.status(404).json({ success: false, message: "Not found" });

    if (creation.user.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    // delete from cloudinary
    try {
      await cloudinary.uploader.destroy(creation.publicId, { resource_type: creation.resourceType });
    } catch (err) {
      console.warn("Cloudinary delete failed:", err);
      // continue to delete DB record anyway
    }

    await creation.deleteOne();
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    console.error("Delete creation error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
