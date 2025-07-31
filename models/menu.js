const mongoose = require("mongoose");

const menu = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    taste: {
      type: String,
      enum: ["sweet", "spicy", "sour"],
      required: true,
    },
    is_drink: {
      type: Boolean,
      default: false,
    },
    ingredient: {
      type: [String],
      default: [],
    },
    no_sales: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const menuItem = new mongoose.model("menuItem", menu);
module.exports = menuItem;
