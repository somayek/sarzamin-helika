const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    gender: [],
    age: Number,
    location: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
