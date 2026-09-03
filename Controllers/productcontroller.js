const Product = require("../Models/product")
//create a product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const product = new Product({ name, description, price, quantity });
    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: "Products retrieved successfully", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update a product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;

    const product = await Product.findByIdAndUpdate(id, { name, description, price, quantity }, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//get all products by id
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product retrieved successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct: exports.updateProduct,
  getProductById: exports.getProductById
};