// const Festival = require("../models/Festival");
// const cloudinary = require("../config/cloudinary");

// // GET — List (Search + Pagination)
// exports.getFestivals = async (req, res) => {
//   try {
//     const { search = "", page = 1, limit = 5 } = req.query;

//     const query = search
//       ? { title: { $regex: search, $options: "i" } }
//       : {};

//     const total = await Festival.countDocuments(query);

//     const festivals = await Festival.find(query)
//       .skip((page - 1) * limit)
//       .limit(limit)
//       .sort({ createdAt: -1 });

//     res.json({
//       festivals,
//       pages: Math.ceil(total / limit),
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

// // POST — Create Festival
// exports.createFestival = async (req, res) => {
//   try {
//     const { title, template, transition, status } = req.body;

//     let logoUrl = "";
//     let logoPublicId = "";

//     if (req.file) {
//       logoUrl = req.file.path;        // Cloudinary URL
//       logoPublicId = req.file.filename; // Cloudinary Public ID
//     }

//     const fest = new Festival({
//       title,
//       template,
//       transition,
//       status,
//       logo: logoUrl,
//       logoPublicId,
//     });

//     await fest.save();

//     res.json({ message: "Festival Created", festival: fest });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Create failed" });
//   }
// };

// // PUT — Update Festival
// exports.updateFestival = async (req, res) => {
//   try {
//     const { title, template, transition, status } = req.body;

//     const festival = await Festival.findById(req.params.id);
//     if (!festival) return res.status(404).json({ error: "Not found" });

//     const update = {
//       title,
//       template,
//       transition,
//       status,
//     };

//     // New Logo?
//     if (req.file) {
//       // old delete
//       if (festival.logoPublicId) {
//         try {
//           await cloudinary.uploader.destroy(festival.logoPublicId);
//         } catch (err) {
//           console.log("Cloudinary delete error:", err.message);
//         }
//       }

//       update.logo = req.file.path;
//       update.logoPublicId = req.file.filename;
//     }

//     const updated = await Festival.findByIdAndUpdate(req.params.id, update, {
//       new: true,
//     });

//     res.json({ message: "Festival Updated", festival: updated });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Update failed" });
//   }
// };

// // DELETE — Remove Festival + Cloudinary Image
// exports.deleteFestival = async (req, res) => {
//   try {
//     const festival = await Festival.findById(req.params.id);

//     if (!festival) return res.status(404).json({ error: "Not found" });

//     // Delete Image from Cloudinary
//     if (festival.logoPublicId) {
//       try {
//         await cloudinary.uploader.destroy(festival.logoPublicId);
//       } catch (err) {
//         console.log("Cloudinary delete warn:", err.message);
//       }
//     }

//     await Festival.findByIdAndDelete(req.params.id);

//     res.json({ message: "Festival Deleted" });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Delete failed" });
//   }
// };



// const Festival = require("../models/Festival");
// const { v2: cloudinary } = require('cloudinary');

// // 📌 GET — List Festivals
// exports.getFestivals = async (req, res) => {
//   try {
//     const { search = "", page = 1, limit = 5 } = req.query;

//     const query = search
//       ? { title: { $regex: search, $options: "i" } }
//       : {};

//     const total = await Festival.countDocuments(query);

//     const festivals = await Festival.find(query)
//       .skip((page - 1) * Number(limit))
//       .limit(Number(limit))
//       .sort({ createdAt: -1 });

//     res.json({
//       festivals,
//       pages: Math.ceil(total / limit),
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

// // 📌 POST — Create Festival
// exports.createFestival = async (req, res) => {
//   try {
//     const { title, template, transition, status, zoom, offsetX, offsetY } = req.body;

//     let logoUrl = "";
//     let logoPublicId = "";

//     // ⭐ Multer + Cloudinary upload
//     if (req.file) {
//       logoUrl = req.file.path;          // Cloudinary URL
//       logoPublicId = req.file.filename; // Cloudinary public_id
//     }

//     const fest = new Festival({
//       title,
//       template,
//       transition,
//       status,
//       logo: logoUrl,
//       logoPublicId,
//       zoom: zoom ? Number(zoom) : 1,
//       offsetX: offsetX ? Number(offsetX) : 0,
//       offsetY: offsetY ? Number(offsetY) : 0,
//     });

//     await fest.save();

//     res.json({ message: "Festival Created", festival: fest });

//   } catch (err) {
//     console.error("❌ Create error:", err);
//     res.status(500).json({ error: "Create failed" });
//   }
// };

// // 📌 PUT — Update Festival
// exports.updateFestival = async (req, res) => {
//   try {
//     const { title, template, transition, status, zoom, offsetX, offsetY } = req.body;

//     const festival = await Festival.findById(req.params.id);
//     if (!festival) return res.status(404).json({ error: "Not found" });

//     const update = {
//       title,
//       template,
//       transition,
//       status,
//       zoom: zoom ? Number(zoom) : festival.zoom,
//       offsetX: offsetX ? Number(offsetX) : festival.offsetX,
//       offsetY: offsetY ? Number(offsetY) : festival.offsetY,
//     };

//     // ⭐ New Logo uploaded?
//     if (req.file) {
//       if (festival.logoPublicId) {
//         try {
//           await cloudinary.uploader.destroy(festival.logoPublicId);
//         } catch (err) {
//           console.log("Cloudinary delete error:", err.message);
//         }
//       }

//       update.logo = req.file.path;
//       update.logoPublicId = req.file.filename;
//     }

//     const updated = await Festival.findByIdAndUpdate(req.params.id, update, { new: true });

//     res.json({ message: "Festival Updated", festival: updated });

//   } catch (err) {
//     console.error("❌ Update error:", err);
//     res.status(500).json({ error: "Update failed" });
//   }
// };

// // 📌 DELETE — Remove Festival + Cloudinary
// exports.deleteFestival = async (req, res) => {
//   try {
//     const festival = await Festival.findById(req.params.id);
//     if (!festival) return res.status(404).json({ error: "Not found" });

//     // ⭐ Delete Cloudinary image
//     if (festival.logoPublicId) {
//       try {
//         await cloudinary.uploader.destroy(festival.logoPublicId);
//       } catch (err) {
//         console.log("Cloudinary delete warn:", err.message);
//       }
//     }

//     await Festival.findByIdAndDelete(req.params.id);

//     res.json({ message: "Festival Deleted" });

//   } catch (err) {
//     console.error("❌ Delete error:", err);
//     res.status(500).json({ error: "Delete failed" });
//   }
// };


const Festival = require("../models/Festival");
const { v2: cloudinary } = require("cloudinary");

// =============================================================
// 📌 GET — List Festivals
// =============================================================
exports.getFestivals = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 5 } = req.query;

    const query = search ? { title: { $regex: search, $options: "i" } } : {};

    const total = await Festival.countDocuments(query);

    const festivals = await Festival.find(query)
      .skip((page - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({ festivals, pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// =============================================================
// 📌 POST — Create Festival
// =============================================================
exports.createFestival = async (req, res) => {
  try {
    const {
      title,
      template,
      transition,
      status,
      zoom,
      offsetX,
      offsetY,
      bannerZoom,
      bannerX,
      bannerY,
    } = req.body;

    let logoUrl = "";
    let logoPublicId = "";

    let bannerUrl = "";
    let bannerPublicId = "";

    // ⭐ Multer fields → req.files (logo + banner)
    if (req.files?.logo?.[0]) {
      logoUrl = req.files.logo[0].path;
      logoPublicId = req.files.logo[0].filename;
    }

    if (req.files?.banner?.[0]) {
      bannerUrl = req.files.banner[0].path;
      bannerPublicId = req.files.banner[0].filename;
    }

    const fest = new Festival({
      title,
      template,
      transition,
      status,

      // LOGO
      logo: logoUrl,
      logoPublicId,
      zoom: Number(zoom),
      offsetX: Number(offsetX),
      offsetY: Number(offsetY),

      // BANNER
      banner: bannerUrl,
      bannerPublicId,
      bannerZoom: Number(bannerZoom),
      bannerX: Number(bannerX),
      bannerY: Number(bannerY),
    });

    await fest.save();

    res.json({ message: "Festival Created", festival: fest });
  } catch (err) {
    console.error("❌ Create error:", err);
    res.status(500).json({ error: "Create failed" });
  }
};

// =============================================================
// 📌 PUT — Update Festival
// =============================================================
exports.updateFestival = async (req, res) => {
  try {
    const {
      title,
      template,
      transition,
      status,
      zoom,
      offsetX,
      offsetY,
      bannerZoom,
      bannerX,
      bannerY,
    } = req.body;

    const festival = await Festival.findById(req.params.id);
    if (!festival) return res.status(404).json({ error: "Not found" });

    const update = {
      title,
      template,
      transition,
      status,

      // LOGO transform
      zoom: Number(zoom),
      offsetX: Number(offsetX),
      offsetY: Number(offsetY),

      // BANNER transform
      bannerZoom: Number(bannerZoom),
      bannerX: Number(bannerX),
      bannerY: Number(bannerY),
    };

    // ⭐ NEW LOGO uploaded?
    if (req.files?.logo?.[0]) {
      if (festival.logoPublicId) {
        await cloudinary.uploader.destroy(festival.logoPublicId).catch(() => {});
      }

      update.logo = req.files.logo[0].path;
      update.logoPublicId = req.files.logo[0].filename;
    }

    // ⭐ NEW BANNER uploaded?
    if (req.files?.banner?.[0]) {
      if (festival.bannerPublicId) {
        await cloudinary.uploader.destroy(festival.bannerPublicId).catch(() => {});
      }

      update.banner = req.files.banner[0].path;
      update.bannerPublicId = req.files.banner[0].filename;
    }

    const updated = await Festival.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    res.json({ message: "Festival Updated", festival: updated });
  } catch (err) {
    console.error("❌ Update error:", err);
    res.status(500).json({ error: "Update failed" });
  }
};

// =============================================================
// 📌 DELETE — Remove Festival + Cloudinary (logo + banner both)
// =============================================================
exports.deleteFestival = async (req, res) => {
  try {
    const festival = await Festival.findById(req.params.id);
    if (!festival) return res.status(404).json({ error: "Not found" });

    // Delete logo
    if (festival.logoPublicId) {
      await cloudinary.uploader.destroy(festival.logoPublicId).catch(() => {});
    }

    // Delete banner
    if (festival.bannerPublicId) {
      await cloudinary.uploader.destroy(festival.bannerPublicId).catch(() => {});
    }

    await Festival.findByIdAndDelete(req.params.id);

    res.json({ message: "Festival Deleted" });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ error: "Delete failed" });
  }
};
