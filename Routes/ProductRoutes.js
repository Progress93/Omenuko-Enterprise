const express = require("express");
const router = express.Router();

// Import the product controller
const productController = require("../Controllers/productcontroller");

// Import the auth middleware
const { protect, authorize } = require("../Middleware/auth");


// Create a product
router.post("/products", protect, authorize('superadmin'), productController.createProduct);

// Get all products
router.get("/products", productController.getAllProducts);

// Update an existing product
router.put("/products/:id", protect, authorize('superadmin'), productController.updateProduct);

// Get a product by ID
router.get("/products/:id", productController.getProductById);

// Export the router
module.exports = router;