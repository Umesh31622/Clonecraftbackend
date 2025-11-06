
<<<<<<< HEAD
=======
// // // // // const mongoose = require("mongoose");

// // // // // const TemplateSchema = new mongoose.Schema(
// // // // //   {
// // // // //     title: { type: String, required: true },
// // // // //     type: { type: String, enum: ["video", "graphics"], required: true },
// // // // //     status: { type: String, enum: ["active", "inactive"], default: "active" },

// // // // //     // Either category OR politician
// // // // //     category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
// // // // //     politician: { type: mongoose.Schema.Types.ObjectId, ref: "Politician" },

// // // // //     profilePosition: {
// // // // //       type: String,
// // // // //       enum: [
// // // // //         "topLeft","topRight","bottomLeft","bottomRight","center",
// // // // //         "centerLeft","centerRight","topCenter","bottomCenter"
// // // // //       ],
// // // // //       default: "bottomCenter",
// // // // //     },
// // // // //     transitionType: {
// // // // //       type: String,
// // // // //       enum: [
// // // // //         "fade","slideFromBottom","slideFromTop","slideFromLeft","slideFromRight",
// // // // //         "slideFromBottomLeft","slideFromBottomRight","slideFromTopLeft","slideFromTopRight",
// // // // //         "scale","rotation","bounce","ripple","profileReveal"
// // // // //       ],
// // // // //       default: "fade",
// // // // //     },
// // // // //     orientation: { type: String, enum: ["landscape", "portrait"], default: "landscape" },
// // // // //     file: { type: String }, // Cloudinary URL
// // // // //   },
// // // // //   { timestamps: true }
// // // // // );

// // // // // module.exports = mongoose.model("Template", TemplateSchema);
// // // // // models/templateModel.js
// // // // const mongoose = require("mongoose");

// // // // const TemplateSchema = new mongoose.Schema(
// // // //   {
// // // //     title: { type: String, required: true },
// // // //     type: { type: String, enum: ["video", "graphics"], required: true },
// // // //     status: { type: String, enum: ["active", "inactive"], default: "active" },
// // // //     frameHeight: { type: Number, default: 300 },
// // // //     frameWidth: { type: Number, default: 500 },


// // // //     // Either category OR politician
// // // //     category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
// // // //     politician: { type: mongoose.Schema.Types.ObjectId, ref: "Politician" },

// // // //     // Link to Frame
// // // //     frame: { type: mongoose.Schema.Types.ObjectId, ref: "Frame" },

// // // //     // Where frame should appear relative to the main content
// // // //     transitionPlacement: { type: String, enum: ["above", "below"], default: "below" },

// // // //     profilePosition: {
// // // //       type: String,
// // // //       enum: [
// // // //         "topLeft","topRight","bottomLeft","bottomRight","center",
// // // //         "centerLeft","centerRight","topCenter","bottomCenter"
// // // //       ],
// // // //       default: "bottomCenter",
// // // //     },
// // // //     transitionType: {
// // // //       type: String,
// // // //       enum: [
// // // //         // Video transition types (kept compact)
// // // //         "fade","slideFromBottom","slideFromTop","slideFromLeft","slideFromRight",
// // // //         "scale","rotation","bounce","ripple","profileReveal"
// // // //       ],
// // // //       default: "fade",
// // // //     },
// // // //     orientation: { type: String, enum: ["landscape", "portrait"], default: "landscape" },

// // // //     // file: Cloudinary URL for image or video
// // // //     file: { type: String },
// // // //   },
// // // //   { timestamps: true }
// // // // );

// // // // module.exports = mongoose.model("Template", TemplateSchema);
// // // const mongoose = require("mongoose");

// // // const TemplateSchema = new mongoose.Schema(
// // //   {
// // //     title: { type: String, required: true },
// // //     type: { type: String, enum: ["video", "graphics"], required: true },
// // //     status: { type: String, enum: ["active", "inactive"], default: "active" },
// // //     frameHeight: { type: Number, default: 300 },
// // //     frameWidth: { type: Number, default: 500 },

// // //     // Either category OR politician
// // //     category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
// // //     politician: { type: mongoose.Schema.Types.ObjectId, ref: "Politician" },

// // //     // Link to Frame - optional: we keep both a ref and an uploaded frameFile url
// // //     frame: { type: mongoose.Schema.Types.ObjectId, ref: "Frame" },

// // //     // If admin uploads a frame image file, saved URL here
// // //     frameFile: { type: String },

// // //     // Where frame should appear relative to the main content
// // //     transitionPlacement: { type: String, enum: ["above", "below"], default: "below" },

// // //     profilePosition: {
// // //       type: String,
// // //       enum: [
// // //         "topLeft","topRight","bottomLeft","bottomRight","center",
// // //         "centerLeft","centerRight","topCenter","bottomCenter"
// // //       ],
// // //       default: "bottomCenter",
// // //     },

// // //     // admin controlled profile size (string like "200x200" or "300px")
// // //     profileSize: { type: String },

// // //     // admin controlled shape
// // //     profileShape: { type: String, enum: ["circle", "square", "rectangle"], default: "circle" },

// // //     transitionType: {
// // //       type: String,
// // //       enum: [
// // //         "fade","slideFromBottom","slideFromTop","slideFromLeft","slideFromRight",
// // //         "scale","rotation","bounce","ripple","profileReveal"
// // //       ],
// // //       default: "fade",
// // //     },
// // //     orientation: { type: String, enum: ["landscape", "portrait"], default: "landscape" },

// // //     // file: Cloudinary URL for image or video
// // //     file: { type: String },

// // //     // Optional: store Cloudinary public ids if you want to delete from Cloudinary later
// // //     filePublicId: { type: String },
// // //     frameFilePublicId: { type: String },
// // //   },
// // //   { timestamps: true }
// // // );

// // // module.exports = mongoose.model("Template", TemplateSchema);
// // const mongoose = require("mongoose");

// // const templateSchema = new mongoose.Schema(
// //   {
// //     title: { type: String, required: true },
// //     type: { type: String, enum: ["video", "graphics"], default: "video" },
// //     status: { type: String, enum: ["active", "inactive"], default: "active" },
// //     category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
// //     politician: { type: mongoose.Schema.Types.ObjectId, ref: "Politician", default: null },
// //     religious: { type: mongoose.Schema.Types.ObjectId, ref: "Religious", default: null },

// //     file: { type: String }, // image/video file
// //     frameFile: { type: String }, // frame image
// //     transitionPlacement: { type: String, default: "below" },
// //     profilePosition: { type: String, default: "center" },
// //     transitionType: { type: String, default: "fade" },
// //     orientation: { type: String, enum: ["landscape", "portrait"], default: "landscape" },
// //     profileSize: { type: String },
// //     profileShape: { type: String, enum: ["circle", "square", "rectangle"], default: "circle" },
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("Template", templateSchema);
// const mongoose = require("mongoose");

// const templateSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     file: { type: String, required: false },
//     frameFile: { type: String, required: false },
//     category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
//     politician: { type: mongoose.Schema.Types.ObjectId, ref: "Politician", default: null },
//     religious: { type: mongoose.Schema.Types.ObjectId, ref: "Religious", default: null },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Template", templateSchema);

>>>>>>> 81e715d1eeddd672021ea025730ba6c7d5f8447e
const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["video", "graphics"], default: "video" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },

    // Parent refs
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
    politician: { type: mongoose.Schema.Types.ObjectId, ref: "Politician", default: null },
    religious: { type: mongoose.Schema.Types.ObjectId, ref: "Religious", default: null },

    // files (cloudinary URLs)
    file: { type: String, default: null },
    filePublicId: { type: String, default: null },
    frameFile: { type: String, default: null },
    frameFilePublicId: { type: String, default: null },

    // UI related fields
    transitionPlacement: { type: String, enum: ["above", "below"], default: "below" },
    transitionType: {
      type: String,
      enum: [
        "fade","slideFromBottom","slideFromTop","slideFromLeft","slideFromRight",
        "scale","rotation","bounce","ripple","profileReveal"
      ],
      default: "fade"
    },
    profilePosition: {
      type: String,
      enum: [
        "topLeft","topRight","bottomLeft","bottomRight","center",
        "centerLeft","centerRight","topCenter","bottomCenter"
      ],
      default: "center"
    },
    orientation: { type: String, enum: ["landscape","portrait"], default: "landscape" },
    profileSize: { type: String, default: "" }, // like "300x300"
    profileShape: { type: String, enum: ["circle","square","rectangle"], default: "circle" },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Template", TemplateSchema);

