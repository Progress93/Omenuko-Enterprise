const express = require("express");
const router = express.Router();

// Import the product controller
const productcontroller = require("../Models/productcontroller");


//define the routes for product creation and update
router.post("/products", productcontroller.createProduct);
router.put("/products/:id", productcontroller.updateProduct);

// Export the router
module.exports = router;