const express = require("express");
const router = express.Router();



// Import the product controller
const productController = require("../Controllers/productcontroller");

// Import the auth middleware
const {protect, authorize} = require("../Middleware/auth");


// Create a product
router.post("/", protect, authorize("superadmin"), productController.createProduct);

// Create a product with image
router.post("/with-image", protect, authorize("superadmin"), productController.createProductWithImage);



// Get all products 
router.get("/", productController.getAllProducts);

// Update an existing product
router.put("/:id", protect, authorize("superadmin"), productController.updateProduct);

// Get a product by ID
router.get("/:id", productController.getProductById);

// Export the router
module.exports = router;