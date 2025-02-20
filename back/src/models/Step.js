const mongoose = require("mongoose");

const StepSchema = new mongoose.Schema(
  {
    text: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Step", StepSchema);
