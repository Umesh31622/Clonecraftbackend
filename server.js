// <<<<<<< HEAD

// =======
// // // // require("dotenv").config();
// // // // const express = require("express");
// // // // const mongoose = require("mongoose");
// // // // const cors = require("cors");
// // // // const helmet = require("helmet");
// // // // const morgan = require("morgan");
// // // // const path = require("path");

// // // // // Routes
// // // // const categoryRoutes = require("./routes/categoryRoutes");
// // // // const templateRoutes = require("./routes/templateRoutes");
// // // // const usersRoutes = require("./routes/users");
// // // // const authRoutes = require("./routes/auth");
// // // // const adminAuthRoutes = require("./routes/adminAuth");
// // // // const dashboardRoutes = require("./routes/dashboard");
// // // // const subscriptionsRoutes = require("./routes/subscriptions");

// // // // const app = express();

// // // // // Middleware
// // // // app.use(helmet());
// // // // app.use(
// // // //   cors({
// // // //     origin: process.env.FRONTEND_URL || "http://localhost:3000",
// // // //     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// // // //     allowedHeaders: ["Content-Type", "Authorization"],
// // // //     credentials: true,
// // // //   })
// // // // );
// // // // app.use(express.json({ limit: "50mb" }));
// // // // app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// // // // if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// // // // // Static files
// // // // app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // // // // MongoDB Connection
// // // // mongoose.set('strictQuery', false);
// // // // const connectDB = async () => {
// // // //   try {
// // // //     await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// // // //     console.log("✅ MongoDB Connected");
// // // //   } catch (err) {
// // // //     console.error("❌ DB Connection Error:", err.message);
// // // //     process.exit(1);
// // // //   }
// // // // };

// // // // // Routes
// // // // app.use("/api/auth", authRoutes);           // User
// // // // app.use("/api/admin", adminAuthRoutes);     // Admin
// // // // app.use("/api/users", usersRoutes);         // User management
// // // // app.use("/api/categories", categoryRoutes);
// // // // app.use("/api/templates", templateRoutes);
// // // // app.use("/api/dashboard", dashboardRoutes);
// // // // app.use("/api/subscriptions", subscriptionsRoutes);

// // // // // Test route
// // // // app.get("/", (req, res) => res.json({ message: "✅ API Running..." }));

// // // // // Error Handling
// // // // app.use((err, req, res, next) => {
// // // //   console.error("❌ Server Error:", err.stack);
// // // //   res.status(500).json({ success: false, message: "Something went wrong", error: err.message });
// // // // });

// // // // // Start server
// // // // const PORT = process.env.PORT || 7000;
// // // // const startServer = async () => {
// // // //   await connectDB();
// // // //   app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
// // // // };
// // // // startServer();

// // // require("dotenv").config();
// // // const express = require("express");
// // // const mongoose = require("mongoose");
// // // const cors = require("cors");
// // // const helmet = require("helmet");
// // // const morgan = require("morgan");
// // // const path = require("path");

// // // // Import Routes
// // // const categoryRoutes = require("./routes/categoryRoutes");
// // // const templateRoutes = require("./routes/templateRoutes");
// // // const usersRoutes = require("./routes/users");
// // // const authRoutes = require("./routes/auth");
// // // const userTemplateRoutes = require("./routes/userTemplateRoutes");
// // // const adminAuthRoutes = require("./routes/adminAuth");
// // // const dashboardRoutes = require("./routes/dashboard");
// // // const subscriptionsRoutes = require("./routes/subscriptions");
// // // const politicianRoutes = require("./routes/politicianRoutes");
// // // const frameRoutes = require("./routes/frameRoutes");
// // // const userAnalyticsRoutes = require("./routes/userAnalyticsRoutes");
// // // const politicianTemplateRoutes = require('./routes/PoliticianTemplateRoutes');
// // // const app = express();

// // // // Middleware
// // // app.use(helmet());
// // // app.use(
// // //   cors({
// // //     origin: process.env.FRONTEND_URL || "http://localhost:3000",
// // //     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// // //     allowedHeaders: ["Content-Type", "Authorization"],
// // //     credentials: true,
// // //   })
// // // );
// // // app.use(express.json({ limit: "50mb" }));
// // // app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// // // if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// // // // Static Folder for Uploaded Files
// // // app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // // // MongoDB Connection
// // // mongoose.set("strictQuery", false);
// // // const connectDB = async () => {
// // //   try {
// // //     await mongoose.connect(process.env.MONGODB_URI, {
// // //       useNewUrlParser: true,
// // //       useUnifiedTopology: true,
// // //     });
// // //     console.log("✅ MongoDB Connected");
// // //   } catch (err) {
// // //     console.error("❌ DB Connection Error:", err.message);
// // //     process.exit(1);
// // //   }
// // // };

// // // // Routes
// // // app.use("/api/auth", authRoutes);
// // // app.use("/api/admin", adminAuthRoutes);
// // // app.use("/api/users", usersRoutes);
// // // app.use("/api/categories", categoryRoutes);
// // // app.use("/api/templates", templateRoutes);
// // // app.use("/api/dashboard", dashboardRoutes);
// // // app.use("/api/subscriptions", subscriptionsRoutes);
// // // app.use("/api/politicians", politicianRoutes);

// // // app.use("/api/frames", frameRoutes);


// // // // existing code ke niche
// // // app.use("/api/user/templates", userTemplateRoutes);

// // // app.use("/api/user-analytics", userAnalyticsRoutes);

// // // app.use('/api/politician-templates', politicianTemplateRoutes);

// // // // Test Route
// // // app.get("/", (req, res) => res.json({ message: "✅ API Running..." }));

// // // // Global Error Handling
// // // app.use((err, req, res, next) => {
// // //   console.error("❌ Server Error:", err.stack);
// // //   res.status(500).json({
// // //     success: false,
// // //     message: "Something went wrong",
// // //     error: err.message,
// // //   });
// // // });

// // // // Start Server
// // // const PORT = process.env.PORT || 7000;
// // // const startServer = async () => {
// // //   await connectDB();
// // //   app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
// // // };
// // // // startServer();
// // // require("dotenv").config();
// // // const express = require("express");
// // // const mongoose = require("mongoose");
// // // const cors = require("cors");
// // // const helmet = require("helmet");
// // // const morgan = require("morgan");
// // // const path = require("path");

// // // const categoryRoutes = require("./routes/categoryRoutes");
// // // const templateRoutes = require("./routes/templateRoutes");
// // // const usersRoutes = require("./routes/users");
// // // const authRoutes = require("./routes/auth");
// // // const userTemplateRoutes = require("./routes/userTemplateRoutes");
// // // const adminAuthRoutes = require("./routes/adminAuth");
// // // const dashboardRoutes = require("./routes/dashboard");
// // // const subscriptionsRoutes = require("./routes/subscriptions");
// // // const politicianRoutes = require("./routes/politicianRoutes");
// // // const frameRoutes = require("./routes/frameRoutes");
// // // const userAnalyticsRoutes = require("./routes/userAnalyticsRoutes");
// // // const politicianTemplateRoutes = require('./routes/PoliticianTemplateRoutes');

// // // const app = express();

// // // // Middleware
// // // app.use(helmet());
// // // app.use(
// // //   cors({
// // //     origin: process.env.FRONTEND_URL || "http://localhost:3000",
// // //     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// // //     allowedHeaders: ["Content-Type", "Authorization"],
// // //     credentials: true,
// // //   })
// // // );
// // // app.use(express.json({ limit: "50mb" }));
// // // app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// // // if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// // // // ✅ Serve static uploads
// // // app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // // // MongoDB
// // // mongoose.set("strictQuery", false);
// // // mongoose
// // //   .connect(process.env.MONGODB_URI)
// // //   .then(() => console.log("✅ MongoDB Connected"))
// // //   .catch((err) => console.error("❌ DB Error:", err.message));

// // // // Routes
// // // app.use("/api/auth", authRoutes);
// // // app.use("/api/admin", adminAuthRoutes);
// // // app.use("/api/users", usersRoutes);
// // // app.use("/api/categories", categoryRoutes);
// // // app.use("/api/templates", templateRoutes);
// // // app.use("/api/dashboard", dashboardRoutes);
// // // app.use("/api/subscriptions", subscriptionsRoutes);
// // // app.use("/api/politicians", politicianRoutes);
// // // app.use("/api/frames", frameRoutes);
// // // app.use("/api/user/templates", userTemplateRoutes);
// // // app.use("/api/user-analytics", userAnalyticsRoutes);
// // // app.use('/api/politician-templates', politicianTemplateRoutes);

// // // // Test route
// // // app.get("/", (req, res) => res.json({ message: "✅ API Running..." }));

// // // // Error handler
// // // app.use((err, req, res, next) => {
// // //   console.error("❌ Server Error:", err.stack);
// // //   res.status(500).json({ success: false, message: "Something went wrong", error: err.message });
// // // });

// // // const PORT = process.env.PORT || 7000;
// // // app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

// // require("dotenv").config();
// // const express = require("express");
// // const mongoose = require("mongoose");
// // const cors = require("cors");
// // const helmet = require("helmet");
// // const morgan = require("morgan");
// // const path = require("path");

// // // ===== Routes =====
// // const categoryRoutes = require("./routes/categoryRoutes");
// // const templateRoutes = require("./routes/templateRoutes");
// // const usersRoutes = require("./routes/users");
// // const authRoutes = require("./routes/auth");
// // const userTemplateRoutes = require("./routes/userTemplateRoutes");
// // const adminAuthRoutes = require("./routes/adminAuth");
// // const dashboardRoutes = require("./routes/dashboard");
// // const subscriptionsRoutes = require("./routes/subscriptions");
// // const politicianRoutes = require("./routes/politicianRoutes");
// // const frameRoutes = require("./routes/frameRoutes");
// // const userAnalyticsRoutes = require("./routes/userAnalyticsRoutes");
// // const politicianTemplateRoutes = require("./routes/PoliticianTemplateRoutes");
// // const creationRoutes = require("./routes/creationRoutes"); // ✅ new

// // const app = express();

// // // ===== Middleware =====
// // app.use(helmet());
// // app.use(
// //   cors({
// //     origin: process.env.FRONTEND_URL || "http://localhost:3000",
// //     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// //     allowedHeaders: ["Content-Type", "Authorization"],
// //     credentials: true,
// //   })
// // );
// // app.use(express.json({ limit: "50mb" }));
// // app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// // if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// // // ✅ Serve static uploads
// // app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // // ===== MongoDB =====
// // mongoose.set("strictQuery", false);
// // mongoose
// //   .connect(process.env.MONGODB_URI)
// //   .then(() => console.log("✅ MongoDB Connected"))
// //   .catch((err) => console.error("❌ DB Error:", err.message));

// // // ===== Routes =====
// // app.use("/api/auth", authRoutes);
// // app.use("/api/admin", adminAuthRoutes);
// // app.use("/api/users", usersRoutes);
// // app.use("/api/categories", categoryRoutes);
// // app.use("/api/templates", templateRoutes);
// // app.use("/api/dashboard", dashboardRoutes);
// // app.use("/api/subscriptions", subscriptionsRoutes);
// // app.use("/api/politicians", politicianRoutes);
// // app.use("/api/frames", frameRoutes);
// // app.use("/api/user/templates", userTemplateRoutes);
// // app.use("/api/user-analytics", userAnalyticsRoutes);
// // app.use("/api/politician-templates", politicianTemplateRoutes);
// // app.use("/api/creations", creationRoutes); // ✅ New My Creation route

// // // ===== Test Route =====
// // app.get("/", (req, res) => res.json({ message: "✅ API Running..." }));

// // // ===== Error Handler =====
// // app.use((err, req, res, next) => {
// //   console.error("❌ Server Error:", err.stack);
// //   res.status(500).json({ success: false, message: "Something went wrong", error: err.message });
// // });

// // const PORT = process.env.PORT || 7000;
// // app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
// >>>>>>> 81e715d1eeddd672021ea025730ba6c7d5f8447e
// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const helmet = require("helmet");
// const morgan = require("morgan");
// const path = require("path");

// const app = express();

// // ===== Middleware =====
// app.use(helmet());

// // ✅ Allow both deployed and local frontends
// app.use(
//   cors({
//     origin: [
//       "https://clonecrafr.vercel.app", // production
//       "http://localhost:3000",         // local development
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// // ✅ Serve static uploads
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // ===== MongoDB Connection =====
// mongoose.set("strictQuery", false);
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ DB Error:", err.message));

// // ===== Routes =====
// const categoryRoutes = require("./routes/categoryRoutes");
// const templateRoutes = require("./routes/templateRoutes");
// const usersRoutes = require("./routes/users");
// const authRoutes = require("./routes/auth");
// const userTemplateRoutes = require("./routes/userTemplateRoutes");
// const adminAuthRoutes = require("./routes/adminAuth");
// const dashboardRoutes = require("./routes/dashboard");
// const subscriptionsRoutes = require("./routes/subscriptions");
// const politicianRoutes = require("./routes/politicianRoutes");
// const frameRoutes = require("./routes/frameRoutes");
// const userAnalyticsRoutes = require("./routes/userAnalyticsRoutes");
// const politicianTemplateRoutes = require("./routes/PoliticianTemplateRoutes");
// const creationRoutes = require("./routes/creationRoutes");
// const religiousRoutes = require("./routes/religiousRoutes");
// const reportsRoutes = require("./routes/reportsRoutes");
// <<<<<<< HEAD
// const languageRoutes = require("./routes/languageRoutes");
// =======

// >>>>>>> 81e715d1eeddd672021ea025730ba6c7d5f8447e

// // ===== Register API Routes =====
// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminAuthRoutes);
// app.use("/api/users", usersRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/templates", templateRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/subscriptions", subscriptionsRoutes);
// app.use("/api/politicians", politicianRoutes);
// app.use("/api/frames", frameRoutes);
// app.use("/api/user/templates", userTemplateRoutes);
// app.use("/api/user-analytics", userAnalyticsRoutes);
// app.use("/api/politician-templates", politicianTemplateRoutes);
// app.use("/api/creations", creationRoutes); // ✅ New route
// app.use("/api/religious", religiousRoutes);
// app.use("/api/reports", reportsRoutes);
// <<<<<<< HEAD
// app.use("/api/languages", languageRoutes);
// =======
// >>>>>>> 81e715d1eeddd672021ea025730ba6c7d5f8447e
// // ===== Test Route =====
// app.get("/", (req, res) => {
//   res.json({ message: "✅ API Running..." });
// });

// // ===== Global Error Handler =====
// app.use((err, req, res, next) => {
//   console.error("❌ Server Error:", err.stack);
//   res.status(500).json({
//     success: false,
//     message: "Something went wrong",
//     error: err.message,
//   });
// });

// // ===== Start Server =====
// const PORT = process.env.PORT || 7000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });



require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const app = express();

// ===== Middleware =====
app.use(helmet());

// ✅ Allow both deployed and local frontends
app.use(
  cors({
    origin: [
      "https://clonecrafr.vercel.app", // production
      "http://localhost:3000",         // local development
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ✅ Serve static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===== MongoDB Connection =====
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Error:", err.message));

// ===== Routes =====
const categoryRoutes = require("./routes/categoryRoutes");
const templateRoutes = require("./routes/templateRoutes");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const userTemplateRoutes = require("./routes/userTemplateRoutes");
const adminAuthRoutes = require("./routes/adminAuth");
const dashboardRoutes = require("./routes/dashboard");
const subscriptionsRoutes = require("./routes/subscriptions");
const politicianRoutes = require("./routes/politicianRoutes");
const frameRoutes = require("./routes/frameRoutes");
// const userAnalyticsRoutes = require("./routes/userAnalyticsRoutes");
const politicianTemplateRoutes = require("./routes/PoliticianTemplateRoutes");
const creationRoutes = require("./routes/creationRoutes");
const religiousRoutes = require("./routes/religiousRoutes");
const reportsRoutes = require("./routes/reportsRoutes");
const languageRoutes = require("./routes/languageRoutes");

// ===== Register API Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/subscriptions", subscriptionsRoutes);
app.use("/api/politicians", politicianRoutes);
app.use("/api/frames", frameRoutes);
app.use("/api/user/templates", userTemplateRoutes);
// app.use("/api/user-analytics", userAnalyticsRoutes);
app.use("/api/politician-templates", politicianTemplateRoutes);
app.use("/api/creations", creationRoutes); // ✅ New route
app.use("/api/religious", religiousRoutes);
app.use("/api/reports", reportsRoutes);

app.use("/api/languages", languageRoutes);
app.get("/", (req, res) => {
  res.json({ message: "✅ API Running..." });
});

// ===== Global Error Handler =====
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
    error: err.message,
  });
});

// ===== Start Server =====
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

