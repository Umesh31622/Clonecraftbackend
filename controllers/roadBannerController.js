// // const RoadBanner = require("../models/roadBannerModel");
// // const Category = require("../models/categoryModel");

// // // Upload helper
// // const getFileInfo = (filesObj, fieldName) => {
// //   if (!filesObj) return null;
// //   const arr = filesObj[fieldName];
// //   if (!arr || !arr.length) return null;
// //   const f = arr[0];
// //   return { url: f.path, public_id: f.filename };
// // };

// // // Get banners
// // exports.getBanners = async (req, res) => {
// //   try {
// //     let { page = 1, limit = 10, search = "" } = req.query;
// //     page = Number(page);
// //     limit = Number(limit);

// //     const filter = search.trim()
// //       ? { title: new RegExp(search.trim(), "i") }
// //       : {};

// //     const total = await RoadBanner.countDocuments(filter);

// //     const banners = await RoadBanner.find(filter)
// //       .populate("category")
// //       .sort({ createdAt: -1 })
// //       .skip((page - 1) * limit)
// //       .limit(limit);

// //     res.json({ success: true, banners, page, pages: Math.ceil(total / limit) });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // Create banner
// // exports.createBanner = async (req, res) => {
// //   try {
// //     const file = getFileInfo(req.files, "bannerImage");

// //     const banner = await RoadBanner.create({
// //       title: req.body.title,
// //       category: req.body.category || null,
// //       bannerImage: file?.url || null,
// //       bannerPublicId: file?.public_id || null
// //     });

// //     res.json({ success: true, banner });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // Update banner
// // exports.updateBanner = async (req, res) => {
// //   try {
// //     const id = req.params.id;

// //     const file = getFileInfo(req.files, "bannerImage");

// //     const data = {
// //       title: req.body.title,
// //       category: req.body.category || null,
// //     };

// //     if (file) {
// //       data.bannerImage = file.url;
// //       data.bannerPublicId = file.public_id;
// //     }

// //     const updated = await RoadBanner.findByIdAndUpdate(id, data, { new: true })
// //       .populate("category");

// //     res.json({ success: true, banner: updated });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // Delete banner
// // exports.deleteBanner = async (req, res) => {
// //   try {
// //     await RoadBanner.findByIdAndDelete(req.params.id);
// //     res.json({ success: true });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // Toggle status
// // exports.toggleStatus = async (req, res) => {
// //   try {
// //     const banner = await RoadBanner.findById(req.params.id);
// //     if (!banner) return res.status(404).json({ success: false });

// //     banner.status = banner.status === "active" ? "inactive" : "active";
// //     await banner.save();

// //     res.json({ success: true, status: banner.status });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };


// // const RoadBanner = require("../models/roadBannerModel");
// // const Category = require("../models/categoryModel");

// // // Upload helper
// // const getFileInfo = (filesObj, fieldName) => {
// //   if (!filesObj) return null;
// //   const arr = filesObj[fieldName];
// //   if (!arr || !arr.length) return null;
// //   const f = arr[0];
// //   return { url: f.path, public_id: f.filename };
// // };

// // /*=========================================
// //     GET BANNERS  (READ + PAGINATION)
// // ==========================================*/
// // exports.getBanners = async (req, res) => {
// //   try {
// //     let { page = 1, limit = 10, search = "" } = req.query;

// //     page = Number(page);
// //     limit = Number(limit);

// //     const filter = search.trim()
// //       ? { title: new RegExp(search.trim(), "i") }
// //       : {};

// //     const total = await RoadBanner.countDocuments(filter);

// //     const banners = await RoadBanner.find(filter)
// //       .populate("category")
// //       .sort({ createdAt: -1 })
// //       .skip((page - 1) * limit)
// //       .limit(limit);

// //     res.json({
// //       success: true,
// //       banners,
// //       page,
// //       pages: Math.ceil(total / limit),
// //       total
// //     });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // /*=========================================
// //     CREATE BANNER
// // ==========================================*/
// // exports.createBanner = async (req, res) => {
// //   try {
// //     const file = getFileInfo(req.files, "bannerImage");

// //     const banner = await RoadBanner.create({
// //       title: req.body.title,
// //       category: req.body.category || null,
// //       bannerImage: file?.url || null,
// //       bannerPublicId: file?.public_id || null,

// //       // Zoom + Position Support
// //       zoom: req.body.zoom || 1,
// //       posX: req.body.posX || 0,
// //       posY: req.body.posY || 0,
// //     });

// //     res.json({ success: true, banner });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // /*=========================================
// //     UPDATE BANNER
// // ==========================================*/
// // exports.updateBanner = async (req, res) => {
// //   try {
// //     const id = req.params.id;

// //     const file = getFileInfo(req.files, "bannerImage");

// //     const data = {
// //       title: req.body.title,
// //       category: req.body.category || null,

// //       // Zoom values update
// //       zoom: req.body.zoom || 1,
// //       posX: req.body.posX || 0,
// //       posY: req.body.posY || 0,
// //     };

// //     if (file) {
// //       data.bannerImage = file.url;
// //       data.bannerPublicId = file.public_id;
// //     }

// //     const updated = await RoadBanner.findByIdAndUpdate(id, data, { new: true })
// //       .populate("category");

// //     res.json({ success: true, banner: updated });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // /*=========================================
// //     DELETE BANNER
// // ==========================================*/
// // exports.deleteBanner = async (req, res) => {
// //   try {
// //     await RoadBanner.findByIdAndDelete(req.params.id);
// //     res.json({ success: true, message: "Banner deleted successfully" });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // /*=========================================
// //     TOGGLE STATUS (ACTIVE/INACTIVE)
// // ==========================================*/
// // exports.toggleStatus = async (req, res) => {
// //   try {
// //     const banner = await RoadBanner.findById(req.params.id);
// //     if (!banner) return res.status(404).json({ success: false, message: "Banner not found" });

// //     banner.status = banner.status === "active" ? "inactive" : "active";
// //     await banner.save();

// //     res.json({ success: true, status: banner.status });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// const RoadBanner = require("../models/roadBannerModel");
// const Category = require("../models/categoryModel");

// // Upload helper
// const getFileInfo = (filesObj, fieldName) => {
//   if (!filesObj) return null;
//   const arr = filesObj[fieldName];
//   if (!arr || !arr.length) return null;
//   const f = arr[0];
//   return { url: f.path, public_id: f.filename };
// };

// /*=========================================
//     GET BANNERS  (READ + PAGINATION)
// ==========================================*/
// exports.getBanners = async (req, res) => {
//   try {
//     let { page = 1, limit = 10, search = "" } = req.query;

//     page = Number(page);
//     limit = Number(limit);

//     const filter = search.trim()
//       ? { title: new RegExp(search.trim(), "i") }
//       : {};

//     const total = await RoadBanner.countDocuments(filter);

//     const banners = await RoadBanner.find(filter)
//       .populate("category")
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(limit);

//     res.json({
//       success: true,
//       banners,
//       page,
//       pages: Math.ceil(total / limit),
//       total
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /*=========================================
//     CREATE BANNER
// ==========================================*/
// exports.createBanner = async (req, res) => {
//   try {
//     const bannerFile = getFileInfo(req.files, "bannerImage");
//     const logoFile   = getFileInfo(req.files, "logoImage");

//     const banner = await RoadBanner.create({
//       title: req.body.title,
//       category: req.body.category || null,

//       // Banner Image
//       bannerImage: bannerFile?.url || null,
//       bannerPublicId: bannerFile?.public_id || null,

//       // Banner Transform
//       zoom: Number(req.body.zoom) || 1,
//       posX: Number(req.body.posX) || 0,
//       posY: Number(req.body.posY) || 0,

//       // Logo Fields
//       logoImage: logoFile?.url || null,
//       logoPublicId: logoFile?.public_id || null,

//       // Logo Transform
//       logoZoom: Number(req.body.logoZoom) || 1,
//       logoX: Number(req.body.logoX) || 0,
//       logoY: Number(req.body.logoY) || 0
//     });

//     res.json({ success: true, banner });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /*=========================================
//     UPDATE BANNER
// ==========================================*/
// exports.updateBanner = async (req, res) => {
//   try {
//     const id = req.params.id;

//     const bannerFile = getFileInfo(req.files, "bannerImage");
//     const logoFile   = getFileInfo(req.files, "logoImage");

//     const data = {
//       title: req.body.title,
//       category: req.body.category || null,

//       // Banner Transform
//       zoom: Number(req.body.zoom) || 1,
//       posX: Number(req.body.posX) || 0,
//       posY: Number(req.body.posY) || 0,

//       // Logo Transform
//       logoZoom: Number(req.body.logoZoom) || 1,
//       logoX: Number(req.body.logoX) || 0,
//       logoY: Number(req.body.logoY) || 0,
//     };

//     if (bannerFile) {
//       data.bannerImage = bannerFile.url;
//       data.bannerPublicId = bannerFile.public_id;
//     }

//     if (logoFile) {
//       data.logoImage = logoFile.url;
//       data.logoPublicId = logoFile.public_id;
//     }

//     const updated = await RoadBanner.findByIdAndUpdate(id, data, { new: true })
//       .populate("category");

//     res.json({ success: true, banner: updated });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /*=========================================
//     DELETE BANNER
// ==========================================*/
// exports.deleteBanner = async (req, res) => {
//   try {
//     await RoadBanner.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "Banner deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

/*=========================================
    TOGGLE STATUS
==========================================*/
// exports.toggleStatus = async (req, res) => {
//   try {
//     const banner = await RoadBanner.findById(req.params.id);
//     if (!banner) return res.status(404).json({ success: false, message: "Banner not found" });

//     banner.status = banner.status === "active" ? "inactive" : "active";
//     await banner.save();

//     res.json({ success: true, status: banner.status });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


const RoadBanner = require("../models/roadBannerModel");

// Helper
const getFile = (files, name) => {
  if (!files || !files[name] || files[name].length === 0) return null;
  const f = files[name][0];
  return { url: f.path, public_id: f.filename };
};

/* GET ALL */
exports.getBanners = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "" } = req.query;

    const filter = search ? { title: new RegExp(search, "i") } : {};

    const total = await RoadBanner.countDocuments(filter);

    const banners = await RoadBanner.find(filter)
      .populate("category")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      banners,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* CREATE */
exports.createBanner = async (req, res) => {
  try {
    const bannerFile = getFile(req.files, "bannerImage");
    const logoFile = getFile(req.files, "logoImage");

    const banner = await RoadBanner.create({
      title: req.body.title,
      category: req.body.category || null,

      bannerImage: bannerFile?.url || null,
      bannerPublicId: bannerFile?.public_id || null,

      zoom: req.body.zoom,
      posX: req.body.posX,
      posY: req.body.posY,

      logoImage: logoFile?.url || null,
      logoPublicId: logoFile?.public_id || null,

      logoZoom: req.body.logoZoom,
      logoX: req.body.logoX,
      logoY: req.body.logoY
    });

    res.json({ success: true, banner });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* UPDATE */
exports.updateBanner = async (req, res) => {
  try {
    const bannerFile = getFile(req.files, "bannerImage");
    const logoFile = getFile(req.files, "logoImage");

    const update = {
      title: req.body.title,
      category: req.body.category || null,

      zoom: req.body.zoom,
      posX: req.body.posX,
      posY: req.body.posY,

      logoZoom: req.body.logoZoom,
      logoX: req.body.logoX,
      logoY: req.body.logoY,
    };

    if (bannerFile) {
      update.bannerImage = bannerFile.url;
      update.bannerPublicId = bannerFile.public_id;
    }

    if (logoFile) {
      update.logoImage = logoFile.url;
      update.logoPublicId = logoFile.public_id;
    }

    const result = await RoadBanner.findByIdAndUpdate(req.params.id, update, { new: true });

    res.json({ success: true, banner: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* DELETE */
exports.deleteBanner = async (req, res) => {
  try {
    await RoadBanner.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Banner Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* TOGGLE STATUS */
exports.toggleStatus = async (req, res) => {
  try {
    const banner = await RoadBanner.findById(req.params.id);
    if (!banner) return res.status(404).json({ success: false, message: "Banner not found" });

    banner.status = banner.status === "active" ? "inactive" : "active";
    await banner.save();

    res.json({ success: true, status: banner.status });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
