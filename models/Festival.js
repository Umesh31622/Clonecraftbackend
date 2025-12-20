// const mongoose = require("mongoose");

// const FestivalSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     template: { type: String, default: "" },
//     transition: { type: String, default: "" },
//     status: { type: String, default: "active" },
//     // logo: Cloudinary URL
//     logo: { type: String, default: "" },
//     // logoPublicId: cloudinary public_id (useful for delete)
//     logoPublicId: { type: String, default: "" }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Festival", FestivalSchema);

// const mongoose = require("mongoose");

// const FestivalSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     template: { type: String, default: "" },
//     transition: { type: String, default: "" },
//     status: { type: String, default: "active" },

//     // Cloudinary Image
//     logo: { type: String, default: "" },         // URL
//     logoPublicId: { type: String, default: "" }, // public_id saved by Cloudinary

//     // Image Transform sliders
//     zoom: { type: Number, default: 1 },
//     offsetX: { type: Number, default: 0 },
//     offsetY: { type: Number, default: 0 }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Festival", FestivalSchema);


const mongoose = require("mongoose");

const FestivalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    template: { type: String, default: "" },
    transition: { type: String, default: "" },
    status: { type: String, default: "active" },

    // ⭐ LOGO (Cloudinary)
    logo: { type: String, default: "" },          // Logo URL
    logoPublicId: { type: String, default: "" },  // Cloudinary public_id

    // ⭐ LOGO Transform Controls
    zoom: { type: Number, default: 1 },
    offsetX: { type: Number, default: 0 },
    offsetY: { type: Number, default: 0 },

    // ⭐ BANNER (Cloudinary)
    banner: { type: String, default: "" },         // Banner URL
    bannerPublicId: { type: String, default: "" }, // Cloudinary public_id

    // ⭐ BANNER Transform Controls
    bannerZoom: { type: Number, default: 1 },
    bannerX: { type: Number, default: 0 },
    bannerY: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Festival", FestivalSchema);
