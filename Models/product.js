const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  size: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    trim: true,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  }
}, {
  timestamps: true
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;