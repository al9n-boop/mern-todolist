// server.js - Express server entry point
require("dotenv").config({ override: true });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";

// Allow requests only from the frontend's address (not every origin)
app.use(cors({ origin: FRONTEND_ORIGIN }));

// Parse JSON request bodies
app.use(express.json());

// Mount the task routes under /api/tasks
app.use("/api/tasks", taskRoutes);

// Unknown routes -> 404 JSON
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Connect to MongoDB (connection string comes from .env), then start listening
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
