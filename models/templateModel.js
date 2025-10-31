
// const mongoose = require("mongoose");

// const TemplateSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     type: { type: String, enum: ["video", "graphics"], required: true },
//     status: { type: String, enum: ["active", "inactive"], default: "active" },

//     // Either category OR politician
//     category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
//     politician: { type: mongoose.Schema.Types.ObjectId, ref: "Politician" },

//     profilePosition: {
//       type: String,
//       enum: [
//         "topLeft","topRight","bottomLeft","bottomRight","center",
//         "centerLeft","centerRight","topCenter","bottomCenter"
//       ],
//       default: "bottomCenter",
//     },
//     transitionType: {
//       type: String,
//       enum: [
//         "fade","slideFromBottom","slideFromTop","slideFromLeft","slideFromRight",
//         "slideFromBottomLeft","slideFromBottomRight","slideFromTopLeft","slideFromTopRight",
//         "scale","rotation","bounce","ripple","profileReveal"
//       ],
//       default: "fade",
//     },
//     orientation: { type: String, enum: ["landscape", "portrait"], default: "landscape" },
//     file: { type: String }, // Cloudinary URL
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Template", TemplateSchema);
// models/templateModel.js
const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["video", "graphics"], required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    frameHeight: { type: Number, default: 300 },
    frameWidth: { type: Number, default: 500 },


    // Either category OR politician
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    politician: { type: mongoose.Schema.Types.ObjectId, ref: "Politician" },

    // Link to Frame
    frame: { type: mongoose.Schema.Types.ObjectId, ref: "Frame" },

    // Where frame should appear relative to the main content
    transitionPlacement: { type: String, enum: ["above", "below"], default: "below" },

    profilePosition: {
      type: String,
      enum: [
        "topLeft","topRight","bottomLeft","bottomRight","center",
        "centerLeft","centerRight","topCenter","bottomCenter"
      ],
      default: "bottomCenter",
    },
    transitionType: {
      type: String,
      enum: [
        // Video transition types (kept compact)
        "fade","slideFromBottom","slideFromTop","slideFromLeft","slideFromRight",
        "scale","rotation","bounce","ripple","profileReveal"
      ],
      default: "fade",
    },
    orientation: { type: String, enum: ["landscape", "portrait"], default: "landscape" },

    // file: Cloudinary URL for image or video
    file: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Template", TemplateSchema);
