const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    nativeName: { type: String, required: true },
    flag: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Language", languageSchema);
