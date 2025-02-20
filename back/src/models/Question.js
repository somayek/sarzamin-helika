const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    text: String,
    key: String,
    input_type: String, // e.g., "text", "radio", "dropdown"
    options: [String],
    next_question_key: String,
    first: Boolean,
    last: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);
