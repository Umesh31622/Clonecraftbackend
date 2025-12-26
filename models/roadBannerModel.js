// // // const mongoose = require("mongoose");

// // // const roadBannerSchema = new mongoose.Schema({
// // //   title: { type: String, required: true },
// // //   category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },

// // //   bannerImage: { type: String, default: null },
// // //   bannerPublicId: { type: String, default: null },

// // //   status: { type: String, default: "active" }, // active / inactive

// // // }, { timestamps: true });

// // // module.exports = mongoose.model("RoadBanner", roadBannerSchema);

// // const mongoose = require("mongoose");

// // const roadBannerSchema = new mongoose.Schema({
// //   title: { type: String, required: true },

// //   category: { 
// //     type: mongoose.Schema.Types.ObjectId, 
// //     ref: "Category", 
// //     default: null 
// //   },

// //   bannerImage: { type: String, default: null },
// //   bannerPublicId: { type: String, default: null },

// //   // ⭐ Added Features
// //   zoom: { type: Number, default: 1 },  // Zoom level
// //   posX: { type: Number, default: 0 },  // Move left/right
// //   posY: { type: Number, default: 0 },  // Move up/down

// //   status: { type: String, default: "active" }, // active / inactive

// // }, { timestamps: true });

// // module.exports = mongoose.model("RoadBanner", roadBannerSchema);

// const mongoose = require("mongoose");

// const roadBannerSchema = new mongoose.Schema({
//   title: { type: String, required: true },

//   category: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "Category", 
//     default: null 
//   },

//   // Banner Image
//   bannerImage: { type: String, default: null },
//   bannerPublicId: { type: String, default: null },

//   // ⭐ Banner Controls
//   zoom: { type: Number, default: 1 },   // Banner Zoom
//   posX: { type: Number, default: 0 },   // Banner Left/Right
//   posY: { type: Number, default: 0 },   // Banner Up/Down

//   // ⭐ LOGO FIELDS ADDED
//   logoImage: { type: String, default: null },
//   logoPublicId: { type: String, default: null },

//   // ⭐ Logo Transform Controls
//   logoZoom: { type: Number, default: 1 }, // Logo Zoom
//   logoX: { type: Number, default: 0 },    // Logo Left/Right
//   logoY: { type: Number, default: 0 },    // Logo Up/Down

//   status: { type: String, default: "active" },

// }, { timestamps: true });

// module.exports = mongoose.model("RoadBanner", roadBannerSchema);


const mongoose = require("mongoose");

const roadBannerSchema = new mongoose.Schema({
  title: { type: String, required: true },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null
  },

  // Single banner image
  bannerImage: { type: String, default: null },
  bannerPublicId: { type: String, default: null },

  // Banner controls
  zoom: { type: Number, default: 1 },
  posX: { type: Number, default: 0 },
  posY: { type: Number, default: 0 },

  // Logo fields
  logoImage: { type: String, default: null },
  logoPublicId: { type: String, default: null },

  // Logo transform
  logoZoom: { type: Number, default: 1 },
  logoX: { type: Number, default: 0 },
  logoY: { type: Number, default: 0 },

  status: { type: String, default: "active" },

}, { timestamps: true });

module.exports = mongoose.model("RoadBanner", roadBannerSchema);
