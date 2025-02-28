const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const Log = require("../back/src/models/Log");
const Request = require("../back/src/models/Request");

const connectDB = require("../back/src/db");
connectDB();

async function dropLogs() {
  try {
    await Log.collection.drop();
    await Request.collection.drop();
    console.log("Log collections dropeed.");
    await mongoose.disconnect();
    console.log("MongoDB connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error inserting data:", error);
    process.exit(1);
  }
}

dropLogs();
