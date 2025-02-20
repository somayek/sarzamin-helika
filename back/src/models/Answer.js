const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema(
  {
    text: String,
    key: String,
    order: Number,
    next_question_key: String,
    documents: [String],
    charges: [Number],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Answer", AnswerSchema);
