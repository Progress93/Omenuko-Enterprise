const express = require("express");
const app = express();
const connectDB = require("./Config/databaseconfig");
const productRoutes = require("./Routes/ProductRoutes");

app.use(express.json());
connectDB();

app.use("/products", productRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});