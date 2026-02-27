const mongoose = require("mongoose");

const ProductdataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "ProductEntry",
    },
  },
  { timestamps: true },
);

const OrderListSchema = new mongoose.Schema(
  {
    customer_name: {
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
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
      enum: ["Pending", "Shipped", "Delivered"],
    },
    items: Array,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  { timestamps: true },
  
);

const Order = mongoose.model("OrderList", OrderListSchema);
const Product = mongoose.model("ProductEntry", ProductdataSchema);

module.exports = { Product, Order };
