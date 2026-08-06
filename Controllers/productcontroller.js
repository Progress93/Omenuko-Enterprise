const product = require("../Models/product");

// crete a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const newProduct = new product({ name, description, price, category });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createProduct };

// get all products
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    const product = new Product({ name, description, price, category });
    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//update a product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category } = req.body;

    const product = await Product.findByIdAndUpdate(id, { name, description, price, category }, { new: true });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};