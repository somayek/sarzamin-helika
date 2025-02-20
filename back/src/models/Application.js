const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    application_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      default: null,
    },
    form: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          default: null,
        },
        selected_answer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Answer",
          default: null,
        },
      },
    ],
    documents: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Document", default: null },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", ApplicationSchema);
