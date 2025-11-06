// const mongoose = require("mongoose");

// const politicianSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   abbreviation: { type: String, required: true },
//   logo: { type: String, default: null }, // Cloudinary URL
//   status: { type: String, enum: ["active", "inactive"], default: "active" },
// }, { timestamps: true });

// module.exports = mongoose.model("Politician", politicianSchema);
const mongoose = require("mongoose");

const politicianSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    abbreviation: String,
    logo: String,
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    religious: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Religious",
    },
    language: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Language",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Politician", politicianSchema);
