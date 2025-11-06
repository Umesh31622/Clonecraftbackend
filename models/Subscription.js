// // backend/models/Subscription.js
// const mongoose = require("mongoose");

// const subscriptionSchema = new mongoose.Schema({
//   user: { type: String, required: true },
//   plan: { type: String, required: true },
//   amount: { type: Number, required: true },
//   currency: { type: String, default: "INR" },
//   paymentId: { type: String },
//   startDate: { type: Date },
//   endDate: { type: Date },
//   status: { type: String, default: "active" }
// }, { timestamps: true });

// module.exports = mongoose.model("Subscription", subscriptionSchema);
// backend/models/Subscription.js
const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    plan: { type: String, required: true }, // e.g., Pro, Premium
    amount: { type: Number, required: true },
    status: { type: String, default: "active" },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    paymentId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
