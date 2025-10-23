

// const mongoose = require("mongoose");

// const TemplateSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     type: { type: String, enum: ["video", "graphics"], required: true },
//     status: { type: String, enum: ["active", "inactive"], default: "active" },
//     category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
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
const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["video", "graphics"], required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },

    // Either category OR politician
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    politician: { type: mongoose.Schema.Types.ObjectId, ref: "Politician" },

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
        "fade","slideFromBottom","slideFromTop","slideFromLeft","slideFromRight",
        "slideFromBottomLeft","slideFromBottomRight","slideFromTopLeft","slideFromTopRight",
        "scale","rotation","bounce","ripple","profileReveal"
      ],
      default: "fade",
    },
    orientation: { type: String, enum: ["landscape", "portrait"], default: "landscape" },
    file: { type: String }, // Cloudinary URL
  },
  { timestamps: true }
);

module.exports = mongoose.model("Template", TemplateSchema);
