// const mongoose = require("mongoose");

// const frameSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     image: {
//       type: String, // Cloudinary URL
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Frame", frameSchema);
const mongoose = require("mongoose");

const frameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, // Cloudinary URL
      required: true,
    },
    height: {
      type: Number,
      required: true,
      default: 300, // default px height
    },
    width: {
      type: Number,
      required: true,
      default: 300, // default px width
    },
    frameType: {
      type: String,
      enum: ["default", "square", "circle"],
      default: "default",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Frame", frameSchema);
