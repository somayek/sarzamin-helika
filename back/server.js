require("dotenv").config();
const express = require("express");
const connectDB = require("./src/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

connectDB();
const app = express();
app.use(express.json()); // Enable JSON request handling
app.use(cors());
app.use(bodyParser.json());

// Import routes
const userRoutes = require("./src/routes/userRoutes");
const questionRoutes = require("./src/routes/questionRoutes");
const answerRoutes = require("./src/routes/answerRoutes");
const ruleRoutes = require("./src/routes/ruleRoutes");
const stepRoutes = require("./src/routes/stepRoutes");
const documentRoutes = require("./src/routes/documentRoutes");

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);
app.use("/api/rules", ruleRoutes);
app.use("/api/steps", stepRoutes);
app.use("/api/documents", documentRoutes);

// Serve static files from React in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "ui", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "ui", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
