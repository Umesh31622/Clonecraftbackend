const mongoose = require("mongoose");

const BirthdaySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },

    photo: { type: String, default: "" },
    photoPublicId: { type: String, default: "" },

    banner: { type: String, default: "" },
    bannerPublicId: { type: String, default: "" },

    zoom: { type: Number, default: 1 },
    offsetX: { type: Number, default: 0 },
    offsetY: { type: Number, default: 0 },

    bannerZoom: { type: Number, default: 1 },
    bannerX: { type: Number, default: 0 },
    bannerY: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Birthday", BirthdaySchema);
