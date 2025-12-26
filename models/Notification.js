// const mongoose = require("mongoose");

// const NotificationSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   message: {
//     type: String,
//     required: true
//   },
//   type: {
//     type: String,
//     enum: ["Normal", "Offer", "Festival", "Update"],
//     default: "Normal"
//   },
//   image: {
//     type: String,
//     default: null
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model("Notification", NotificationSchema);


const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  title: String,
  message: String,
  type: String,     // ❌ ENUM removed
  image: String,    // Cloudinary URL
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Notification", NotificationSchema);
