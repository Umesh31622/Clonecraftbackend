// const Subscription = require("../models/Subscription");
// const Razorpay = require("razorpay");

// // ----------------------
// // Razorpay Instance
// // ----------------------
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

// // ----------------------------------------
// // GET all subscriptions
// // ----------------------------------------
// exports.getAllSubscriptions = async (req, res) => {
//   try {
//     const subs = await Subscription.find().sort({ createdAt: -1 });
//     res.json({ success: true, subscriptions: subs });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ----------------------------------------
// // Add subscription (Manually by admin)
// // ----------------------------------------
// exports.createSubscription = async (req, res) => {
//   try {
//     const { user, plan, amount } = req.body;

//     const newSub = new Subscription({
//       user,
//       plan,
//       amount,
//       status: "pending",
//     });

//     await newSub.save();

//     res.json({ success: true, subscription: newSub });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ----------------------------------------
// // Update subscription (after payment)
// // ----------------------------------------
// exports.updateSubscription = async (req, res) => {
//   try {
//     const updated = await Subscription.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.json({ success: true, subscription: updated });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ----------------------------------------
// // DELETE subscription
// // ----------------------------------------
// exports.deleteSubscription = async (req, res) => {
//   try {
//     await Subscription.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "Subscription deleted" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ----------------------------------------
// // Create Razorpay Order
// // ----------------------------------------
// exports.createOrder = async (req, res) => {
//   const { amount, currency } = req.body;

//   try {
//     const order = await razorpay.orders.create({
//       amount: amount * 100, // convert rupees → paise
//       currency: currency || "INR",
//       payment_capture: 1,
//     });

//     res.json({ success: true, order });
//   } catch (err) {
//     console.error("Razorpay Order Error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to create Razorpay order",
//     });
//   }
// };

const Subscription = require("../models/Subscription");
const Razorpay = require("razorpay");

// ----------------------
// Razorpay Instance
// ----------------------
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// ----------------------------------------
// GET all subscriptions
// ----------------------------------------
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.find().sort({ createdAt: -1 });
    res.json({ success: true, subscriptions: subs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ----------------------------------------
// Add subscription (with GST) — FIXED
// ----------------------------------------
exports.createSubscription = async (req, res) => {
  try {
    let { user, plan, amount, gstPercent = 0 } = req.body;

    // ⭐ FIX: Convert Strings to Numbers
    amount = Number(amount);
    gstPercent = Number(gstPercent);

    const gstAmount = (amount * gstPercent) / 100;
    const finalAmount = amount + gstAmount;

    const newSub = new Subscription({
      user,
      plan,
      amount,
      gstPercent,
      gstAmount,
      finalAmount,
      status: "pending",
    });

    await newSub.save();

    res.json({ success: true, subscription: newSub });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ----------------------------------------
// Update subscription (after payment OR GST update) — FIXED
// ----------------------------------------
exports.updateSubscription = async (req, res) => {
  try {
    const data = req.body;

    if (data.amount || data.gstPercent) {
      const amount = Number(data.amount);
      const gstPercent = Number(data.gstPercent);

      const gstAmount = (amount * gstPercent) / 100;
      const finalAmount = amount + gstAmount;

      data.amount = amount;
      data.gstPercent = gstPercent;
      data.gstAmount = gstAmount;
      data.finalAmount = finalAmount;
    }

    const updated = await Subscription.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    res.json({ success: true, subscription: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ----------------------------------------
// Create Razorpay Order (using finalAmount)
// ----------------------------------------
exports.createOrder = async (req, res) => {
  const { finalAmount, currency } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: Number(finalAmount) * 100, // convert to paise
      currency: currency || "INR",
      payment_capture: 1,
    });

    res.json({ success: true, order });
  } catch (err) {
    console.error("Razorpay Order Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
    });
  }
};
// ----------------------------------------
// DELETE subscription  ✅ REQUIRED
// ----------------------------------------
exports.deleteSubscription = async (req, res) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Subscription deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
