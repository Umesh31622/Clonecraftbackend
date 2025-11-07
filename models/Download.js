const mongoose = require("mongoose");

const downloadSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isProfile: { type: Boolean, default: false },
    category: { type: String, default: "" },
    file: { type: String, default: "" },
    frameFile: { type: String, default: "" },
    transitionPlacement: { type: String, default: "" },
    transitionType: { type: String, default: "" },
    profilePosition: { type: String, default: "" },
    profileSize: { type: String, default: "" },
    profileShape: { type: String, default: "" },
    isImage: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Download", downloadSchema);
 
