// // const AdMobAd = require("../models/AdMobAd");
// // const AdMobSettings = require("../models/AdMobSettings");

// // // DEFAULT STRUCTURE
// // const defaultSettings = {
// //   banner: { enabled: false, adUnitId: "", position: "bottom" },
// //   interstitial: { enabled: false, adUnitId: "", frequency: 3 },
// //   rewarded: { enabled: false, adUnitId: "", rewardAmount: 10 }
// // };

// // // GET SETTINGS
// // exports.getSettings = async (req, res) => {
// //   try {
// //     let android = await AdMobSettings.findOne({ platform: "android" });
// //     let ios = await AdMobSettings.findOne({ platform: "ios" });

// //     // Create default if missing
// //     if (!android) {
// //       android = await AdMobSettings.create({ platform: "android", ...defaultSettings });
// //     }

// //     if (!ios) {
// //       ios = await AdMobSettings.create({ platform: "ios", ...defaultSettings });
// //     }

// //     res.json({ success: true, android, ios });

// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // SAVE SETTINGS
// // exports.saveSettings = async (req, res) => {
// //   try {
// //     const { android, ios } = req.body;

// //     await AdMobSettings.findOneAndUpdate(
// //       { platform: "android" },
// //       { ...android, platform: "android" },
// //       { upsert: true }
// //     );

// //     await AdMobSettings.findOneAndUpdate(
// //       { platform: "ios" },
// //       { ...ios, platform: "ios" },
// //       { upsert: true }
// //     );

// //     res.json({ success: true, message: "Settings Saved" });

// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // GET ADS
// // exports.getAds = async (req, res) => {
// //   try {
// //     const ads = await AdMobAd.find().sort({ createdAt: -1 });
// //     res.json({ success: true, ads });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // CREATE AD
// // exports.createAd = async (req, res) => {
// //   try {
// //     const ad = await AdMobAd.create(req.body);
// //     res.json({ success: true, ad });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // UPDATE AD
// // exports.updateAd = async (req, res) => {
// //   try {
// //     const updated = await AdMobAd.findByIdAndUpdate(req.params.id, req.body, { new: true });
// //     res.json({ success: true, ad: updated });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // DELETE AD
// // exports.deleteAd = async (req, res) => {
// //   try {
// //     await AdMobAd.findByIdAndDelete(req.params.id);
// //     res.json({ success: true, message: "Ad deleted" });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // TOGGLE STATUS
// // exports.toggleStatus = async (req, res) => {
// //   try {
// //     const ad = await AdMobAd.findById(req.params.id);
// //     if (!ad) return res.status(404).json({ success: false, message: "Ad not found" });

// //     ad.status = ad.status === "active" ? "inactive" : "active";
// //     await ad.save();

// //     res.json({ success: true, status: ad.status });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// const AdMobAd = require("../models/AdMobAd");
// const AdMobSettings = require("../models/AdMobSettings");

// // DEFAULT STRUCTURE
// const defaultSettings = {
//   banner: { enabled: false, adUnitId: "", position: "bottom" },
//   interstitial: { enabled: false, adUnitId: "", frequency: 3 },
//   rewarded: { enabled: false, adUnitId: "", rewardAmount: 10 }
// };

// // =============================
// // GET SETTINGS (Android + iOS)
// // =============================
// exports.getSettings = async (req, res) => {
//   try {
//     let android = await AdMobSettings.findOne({ platform: "android" });
//     let ios = await AdMobSettings.findOne({ platform: "ios" });

//     if (!android) {
//       android = await AdMobSettings.create({ platform: "android", ...defaultSettings });
//     }

//     if (!ios) {
//       ios = await AdMobSettings.create({ platform: "ios", ...defaultSettings });
//     }

//     res.json({ success: true, android, ios });

//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // =============================
// // SAVE SETTINGS
// // =============================
// exports.saveSettings = async (req, res) => {
//   try {
//     const { android, ios } = req.body;

//     await AdMobSettings.findOneAndUpdate(
//       { platform: "android" },
//       { ...android, platform: "android" },
//       { upsert: true, new: true }
//     );

//     await AdMobSettings.findOneAndUpdate(
//       { platform: "ios" },
//       { ...ios, platform: "ios" },
//       { upsert: true, new: true }
//     );

//     res.json({ success: true, message: "Settings Saved Successfully!" });

//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // =============================
// // GET ALL ADS
// // =============================
// exports.getAds = async (req, res) => {
//   try {
//     const ads = await AdMobAd.find().sort({ createdAt: -1 });
//     res.json({ success: true, ads });

//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // =============================
// // GET SINGLE AD
// // =============================
// exports.getSingleAd = async (req, res) => {
//   try {
//     const ad = await AdMobAd.findById(req.params.id);

//     if (!ad) return res.status(404).json({ success: false, message: "Ad Not Found" });

//     res.json({ success: true, ad });

//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // =============================
// // CREATE AD
// // =============================
// exports.createAd = async (req, res) => {
//   try {
//     const ad = await AdMobAd.create(req.body);
//     res.json({ success: true, message: "Ad Created", ad });

//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // =============================
// // UPDATE AD
// // =============================
// exports.updateAd = async (req, res) => {
//   try {
//     const updatedAd = await AdMobAd.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     if (!updatedAd)
//       return res.status(404).json({ success: false, message: "Ad Not Found" });

//     res.json({ success: true, message: "Ad Updated", ad: updatedAd });

//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // =============================
// // DELETE AD
// // =============================
// exports.deleteAd = async (req, res) => {
//   try {
//     const ad = await AdMobAd.findByIdAndDelete(req.params.id);

//     if (!ad)
//       return res.status(404).json({ success: false, message: "Ad Not Found" });

//     res.json({ success: true, message: "Ad Deleted" });

//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // =============================
// // TOGGLE ACTIVE / INACTIVE
// // =============================
// exports.toggleStatus = async (req, res) => {
//   try {
//     const ad = await AdMobAd.findById(req.params.id);

//     if (!ad)
//       return res.status(404).json({ success: false, message: "Ad Not Found" });

//     ad.status = ad.status === "active" ? "inactive" : "active";
//     await ad.save();

//     res.json({ success: true, status: ad.status });

//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


const AdMobAd = require("../models/AdMobAd");
const AdMobSettings = require("../models/AdMobSettings");

// DEFAULT STRUCTURE
const defaultSettings = {
  banner: { enabled: false, adUnitId: "", position: "bottom" },
  interstitial: { enabled: false, adUnitId: "", frequency: 3 },
  rewarded: { enabled: false, adUnitId: "", rewardAmount: 10 }
};

// =============================
// GET SETTINGS (Android + iOS)
// =============================
exports.getSettings = async (req, res) => {
  try {
    let android = await AdMobSettings.findOne({ platform: "android" });
    let ios = await AdMobSettings.findOne({ platform: "ios" });

    if (!android)
      android = await AdMobSettings.create({
        platform: "android",
        ...defaultSettings,
      });

    if (!ios)
      ios = await AdMobSettings.create({
        platform: "ios",
        ...defaultSettings,
      });

    res.json({ success: true, android, ios });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// =============================
// SAVE SETTINGS (Enable/Disable Included)
// =============================
exports.saveSettings = async (req, res) => {
  try {
    const { android, ios } = req.body;

    await AdMobSettings.findOneAndUpdate(
      { platform: "android" },
      { ...android, platform: "android" },
      { upsert: true, new: true }
    );

    await AdMobSettings.findOneAndUpdate(
      { platform: "ios" },
      { ...ios, platform: "ios" },
      { upsert: true, new: true }
    );

    res.json({ success: true, message: "Settings Saved Successfully!" });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// =============================
// GET ALL ADS
// =============================
exports.getAds = async (req, res) => {
  try {
    const ads = await AdMobAd.find().sort({ createdAt: -1 });
    res.json({ success: true, ads });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// =============================
// GET SINGLE AD
// =============================
exports.getSingleAd = async (req, res) => {
  try {
    const ad = await AdMobAd.findById(req.params.id);
    if (!ad)
      return res.status(404).json({ success: false, message: "Ad Not Found" });

    res.json({ success: true, ad });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// =============================
// CREATE AD (Default enable = true)
// =============================
exports.createAd = async (req, res) => {
  try {
    const ad = await AdMobAd.create({
      ...req.body,
      status: req.body.status || "active",
      impressions: 0,
      clicks: 0,
    });

    res.json({ success: true, message: "Ad Created", ad });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// =============================
// UPDATE AD
// =============================
exports.updateAd = async (req, res) => {
  try {
    const updatedAd = await AdMobAd.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedAd)
      return res.status(404).json({ success: false, message: "Ad Not Found" });

    res.json({ success: true, message: "Ad Updated", ad: updatedAd });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// =============================
// DELETE AD
// =============================
exports.deleteAd = async (req, res) => {
  try {
    const ad = await AdMobAd.findByIdAndDelete(req.params.id);

    if (!ad)
      return res.status(404).json({ success: false, message: "Ad Not Found" });

    res.json({ success: true, message: "Ad Deleted" });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// =============================
// TOGGLE ACTIVE / INACTIVE
// =============================
exports.toggleStatus = async (req, res) => {
  try {
    const ad = await AdMobAd.findById(req.params.id);

    if (!ad)
      return res.status(404).json({ success: false, message: "Ad Not Found" });

    // Enable / Disable Logic
    ad.status = ad.status === "active" ? "inactive" : "active";
    await ad.save();

    res.json({
      success: true,
      message: `Ad ${ad.status === "active" ? "Enabled" : "Disabled"}`,
      status: ad.status,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
