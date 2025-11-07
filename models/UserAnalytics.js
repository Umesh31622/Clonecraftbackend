// // const mongoose = require("mongoose");

// // <<<<<<< HEAD
// // const userAnalyticsSchema = new mongoose.Schema(
// //   {
// //     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// //     downloads: { type: Number, default: 0 },
// //     shares: { type: Number, default: 0 },

// //     creationData: {
// //       isProfile: { type: Boolean, default: false },
// //       category: { type: String, default: "" },
// //       file: { type: String, default: "" }, // Cloudinary main file
// //       frameFile: { type: String, default: "" }, // Cloudinary frame file
// //       transitionPlacement: { type: String, default: "" },
// //       transitionType: { type: String, default: "" },
// //       profilePosition: { type: String, default: "" },
// //       profileSize: { type: String, default: "" },
// //       profileShape: { type: String, default: "" },
// //       isImage: { type: Boolean, default: true },
// //     },
// //   },
// //   { timestamps: true }
// // );
// // =======
// // const userAnalyticsSchema = new mongoose.Schema({
// //   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// //   downloads: { type: Number, default: 0 },
// //   shares: { type: Number, default: 0 },
// // }, { timestamps: true });
// // >>>>>>> 81e715d1eeddd672021ea025730ba6c7d5f8447e

// // module.exports = mongoose.model("UserAnalytics", userAnalyticsSchema);


// const mongoose = require("mongoose");

// const userAnalyticsSchema = new mongoose.Schema(
//   {
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     downloads: { type: Number, default: 0 },
//     shares: { type: Number, default: 0 },

//     creationData: {
//       isProfile: { type: Boolean, default: false },
//       category: { type: String, default: "" },
//       file: { type: String, default: "" }, // Cloudinary main file
//       frameFile: { type: String, default: "" }, // Cloudinary frame file
//       transitionPlacement: { type: String, default: "" },
//       transitionType: { type: String, default: "" },
//       profilePosition: { type: String, default: "" },
//       profileSize: { type: String, default: "" },
//       profileShape: { type: String, default: "" },
//       isImage: { type: Boolean, default: true },
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("UserAnalytics", userAnalyticsSchema);



