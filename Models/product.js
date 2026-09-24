const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price must be a positive number"]
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, "Quantity must be a positive number"]
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  image: {
    type: String,
    trim: true,
    required: false
  }
}, {
  timestamps: true
}
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;