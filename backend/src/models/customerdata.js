const mongoose = require("mongoose");
const CustomerDataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    contact: {
      type: String,
      unique:true,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,      // <--- YE TYPE ADD KARNA ZAROORI HAI
      required: true,
    },
    role: {
      type: String,
      default: "CustomerEntry",
    },
    status:{
     type:Boolean,
     default:true
    },
  },
  { timestamps: true },
);

const Customer = mongoose.model("CustomerEntry", CustomerDataSchema);

module.exports = { Customer };