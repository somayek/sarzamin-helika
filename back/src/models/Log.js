const mongoose = require("mongoose");
const Request = require("./Request"); // Import the Request model

const LogSchema = new mongoose.Schema(
  {
    requests: [
      {
        type: mongoose.Schema.Types.ObjectId, // This makes the requests an array of ObjectIds
        ref: "Request", // Refers to the 'Request' model
        required: true,
      },
    ],
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Log = mongoose.model("Log", LogSchema);

module.exports = Log;
