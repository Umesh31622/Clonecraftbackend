
// const Template = require("../models/templateModel");
// const cloudinary = require("../utils/cloudinary");
// const axios = require("axios");
// const fs = require("fs");
// const path = require("path");

// // Download file helper (kept because axios+fs exist in your imports)
// async function download(url, output) {
//   const writer = fs.createWriteStream(output);
//   const res = await axios({ url, method: "GET", responseType: "stream" });
//   res.data.pipe(writer);
//   return new Promise((resolve) => writer.on("finish", resolve));
// }

// // MAIN function (no ffmpeg)
// exports.addOverlayAnimation = async (req, res) => {
//   try {
//     const { videoUrl, imageUrl } = req.body;

//     if (!videoUrl || !imageUrl) {
//       return res.status(400).json({ error: "videoUrl and imageUrl required" });
//     }

//     // Upload video directly from URL (Cloudinary handles URL)
//     const result = await cloudinary.uploader.upload(videoUrl, {
//       resource_type: "video",
//       folder: "final_videos",
//       transformation: [
//         {
//           overlay: imageUrl,
//           width: 300,
//           gravity: "north",
//           y: -300,
//           effect: "fade:1500"
//         },
//         {
//           flags: "layer_apply",
//           gravity: "center",
//           y: 0,
//           effect: "accelerate:60"
//         }
//       ]
//     });

//     return res.json({
//       status: true,
//       finalVideoUrl: result.secure_url,
//     });

//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ status: false, error: err.message });
//   }
// };
const Template = require("../models/templateModel");
const cloudinary = require("../utils/cloudinary");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

// ------------------------------
// Helper: Download file
// ------------------------------
async function download(url, output) {
  const writer = fs.createWriteStream(output);
  const res = await axios({ url, method: "GET", responseType: "stream" });
  res.data.pipe(writer);
  return new Promise((resolve) => writer.on("finish", resolve));
}

// ------------------------------
// 1️⃣ MAIN VIDEO RENDER FUNCTION
// ------------------------------
exports.renderCraftoVideo = async (req, res) => {
  try {
    const { templateId, userData } = req.body;

    if (!templateId) {
      return res.status(400).json({ error: "templateId required" });
    }

    const template = await Template.findById(templateId);
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    return res.json({
      status: true,
      message: "Render request received",
      template,
      userData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: false, error: err.message });
  }
};

// ------------------------------
// 2️⃣ AVAILABLE TRANSITIONS LIST
// ------------------------------
exports.getAvailableTransitions = async (req, res) => {
  try {
    const transitions = [
      "fade",
      "zoom",
      "slide-left",
      "slide-right",
      "spin",
      "wipe",
      "glitch",
      "swirl",
    ];
    return res.json({ status: true, transitions });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: false, error: err.message });
  }
};

// ------------------------------
// 3️⃣ ADD OVERLAY ANIMATION
// ------------------------------
exports.addOverlayAnimation = async (req, res) => {
  try {
    const { videoUrl, imageUrl } = req.body;

    if (!videoUrl || !imageUrl) {
      return res.status(400).json({ error: "videoUrl and imageUrl required" });
    }

    // Cloudinary will process URL directly
    const result = await cloudinary.uploader.upload(videoUrl, {
      resource_type: "video",
      folder: "final_videos",
      transformation: [
        {
          overlay: imageUrl,
          width: 300,
          gravity: "north",
          y: -300,
          effect: "fade:1500",
        },
        {
          flags: "layer_apply",
          gravity: "center",
          y: 0,
          effect: "accelerate:60",
        },
      ],
    });

    return res.json({
      status: true,
      finalVideoUrl: result.secure_url,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: false, error: err.message });
  }
};
