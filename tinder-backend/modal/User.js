const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    dateOfBirth: { type: Date },
    password: {
      type: String,
      required: true,
      select: false,
    },
    intrestedIn: {
      type: String,
    },
    gender: {
      type: String,
    },
    email: { type: String, required: true, unique: true },
    profile: { type: Array },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
User.createIndexes();
module.exports = User;
