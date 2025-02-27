const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema(
  {
    name: String,
    application: String,
    selectedAnswers: {},
    documents: [String],
    charges: [Number],
    rule: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", RequestSchema);
