// const Notification = require("../models/Notification");

// exports.createNotification = async (req, res) => {
//   try {
//     const image = req.file ? req.file.filename : null;

//     const notif = await Notification.create({
//       title: req.body.title,
//       message: req.body.message,
//       type: req.body.type,
//       image: image
//     });

//     res.status(201).json({ success: true, notif });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getNotifications = async (req, res) => {
//   try {
//     const notifications = await Notification.find().sort({ createdAt: -1 });
//     res.json({ success: true, notifications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.deleteNotification = async (req, res) => {
//   try {
//     await Notification.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "Notification Deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const Notification = require("../models/Notification");

// exports.createNotification = async (req, res) => {
//   try {
//     // Cloudinary image URL
//     const imageUrl = req.file ? req.file.path : null;

//     const notif = await Notification.create({
//       title: req.body.title,
//       message: req.body.message,
//       type: req.body.type,
//       image: imageUrl,   // Cloudinary URL save होगा
//     });

//     res.status(201).json({ success: true, notif });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getNotifications = async (req, res) => {
//   try {
//     const notifications = await Notification.find().sort({ createdAt: -1 });
//     res.json({ success: true, notifications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.deleteNotification = async (req, res) => {
//   try {
//     await Notification.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "Notification Deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


const Notification = require("../models/Notification");

// ============================= CREATE =============================
exports.createNotification = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : null;

    const notif = await Notification.create({
      title: req.body.title,
      message: req.body.message,
      type: req.body.type,
      image: imageUrl,
    });

    res.status(201).json({ success: true, notif });
  } catch (error) {
    console.log("Create Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ============================= READ LIST =============================
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json({ success: true, notifications });
  } catch (error) {
    console.log("List Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ============================= UPDATE =============================
exports.updateNotification = async (req, res) => {
  try {
    const id = req.params.id;

    let imageUrl = req.body.existingImage;  
    if (req.file) {
      imageUrl = req.file.path;  // New Cloudinary URL
    }

    const updated = await Notification.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        message: req.body.message,
        type: req.body.type,
        image: imageUrl,
      },
      { new: true }
    );

    res.json({ success: true, updated });
  } catch (error) {
    console.log("Update Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ============================= DELETE =============================
exports.deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Notification Deleted" });
  } catch (error) {
    console.log("Delete Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
