const Product = require("../Models/product");
const upload = require("../Middleware/upload");
const sendEmail = require("../Middleware/emailsender");



const createProduct = async (req, res) => { 
  try { 
    const { 
      name, 
      description, 
      price, 
      quantity, 
      email } = req.body;

    // Validate email
    if (!email) {
        return res.status(400).json({
            message: "Email is required"
        });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Please provide a valid email address"
        });
    }

    // Create product
    const product = new Product({
        name,
        description,
        price,
        quantity
    });

    await product.save();

    // Email details
    const Subject = "New Product Created";

    const Text = `A new product has been created:

Name: ${name} 
Quantity: ${quantity} 
Price: ${price} 
Description: ${description}`;

    // Send email to the email supplied in JSON
    await sendEmail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: Subject,
        text: Text
    });

    res.status(201).json({
        message: "Product created successfully and email sent",
        product
    });

} catch (error) {
    console.error(error);

    res.status(500).json({
        message: "Failed to create product",
        error: error.message
    });
}
};


// create a product with image
// const createProductWithImage = async (req, res) => {
//   upload.single('image')(req, res, async (err) => {
//   try {
//     //check upload error
//     if (err) {
//       return res.status(400).json({ message: err.message });
//     }
//     const { name, description, price, quantity, image } = req.body;
//     //check required fields
//     if (!name || !description || !price === undefined|| !quantity === undefined || !image) {
//       return res.status(400).json({ message: "Please provide all required fields" });
//     }

//     //check image
//     if (!req.file){
//       return res.status(400).json({
//         message: "Please upload an image"
//       })
//     }
//     const product = new Product({ name,
//        description,
//         price,
//          quantity,
//           image: req.file.path,
//          });

//     await product.save();

//     res.status(201).json({ message: "Product created successfully", product });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
// };
 const createProductWithImage = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    try {
      // Check upload error
      if (err) {
        return res.status(400).json({
          message: err.message
        });
      }

      const { name, description, price, quantity } = req.body;

      // Check required fields
      if (
        !name ||
        !description ||
        price === undefined ||
        quantity === undefined
      ) {
        return res.status(400).json({
          message: "Please provide all required fields"
        });
      }

      // Check image
      if (!req.file) {
        return res.status(400).json({
          message: "Please upload an image"
        });
      }

      // Create product
      const product = new Product({
        name,
        description,
        price,
        quantity,
        image: req.file.path
      });

      await product.save();



      res.status(201).json({
        message: "Product created successfully",
        product
      });

    } catch (error) {
      res.status(400).json({
        message: error.message
      });
    }
  });
};
//Upload product image
const uploadProductImage = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (req.file == undefined) {
      return res.status(400).json({ message: "Please upload a file!" });
    }
    res.status(200).json({ message: "File uploaded successfully", file: req.file });
  });
};

// get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: "Products retrieved successfully", products, });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update a product
const updateProduct = async (req, res) => {
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
const getProductById = async (req, res) => {
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
  createProductWithImage,
  uploadProductImage,
  getAllProducts,
  updateProduct,
  getProductById
};