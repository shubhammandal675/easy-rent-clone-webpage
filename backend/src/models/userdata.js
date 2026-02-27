const mongoose = require("mongoose");

const UserdataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    // ADDED: Password field is required for the update task
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "UserEntry",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("UserEntry", UserdataSchema);

module.exports = { User };