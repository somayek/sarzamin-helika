const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema(
  {
    name: String,
    application: String,
    selectedAnswers: {},
    documents: [String],
    charges: [{ amount: Number, description: String, currency: String }],
    rule: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", RequestSchema);
