require('dotenv').config();
const express = require("express");

const connectDB = require("./Config/databaseconfig");
const productRoutes = require("./Routes/ProductRoutes");
const userRoutes = require("./Routes/UserRoutes");

const app = express();

app.use(express.json());

// connect to Db
connectDB();
// Products Routes
app.use("/products", productRoutes);
// Users Routes
app.use("/users", userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});