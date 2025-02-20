const mongoose = require("mongoose");

const docSchema = new mongoose.Schema({
  text: { type: String }, // e.g., "Cover Letter"
  key: String,
});

module.exports = mongoose.model("Doc", docSchema);
