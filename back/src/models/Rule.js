const mongoose = require("mongoose");

const RuleSchema = new mongoose.Schema(
  {
    application: String,
    questions: [String],
    answers: [String],
    documents: [String],
    steps: [String],
    charges: [Number],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rule", RuleSchema);
