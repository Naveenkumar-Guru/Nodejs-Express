import express from "express";
import Product from "../model/Product.js"; // ✅ Model name in PascalCase

const router = express.Router(); // ✅ Router instance in camelCase

/*
============================================================
   ROUTE: Get All Products
   METHOD: GET
   URL: http://127.0.0.1:8000/product/all
   ACCESS: Public
   DESCRIPTION: Fetch all available products from the database
============================================================
*/


router.get("/all", async (req, res) => {
  try {
    const products = await Product.find(); //  Model name is PascalCase
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return res.status(500).json({ message: error.message });
  }
});

/*
============================================================
   ROUTE: Create New Product
   METHOD: POST
   URL: http://127.0.0.1:8000/product/create
   ACCESS: Public
   REQUIRED FIELDS: pname, price, image, qty, info
   DESCRIPTION: Create a new product entry in the database
============================================================
*/
router.post("/create", async (req, res) => {
  try {
    const productData = req.body;
    console.log("Received Product Data:", productData);

    // Check if product already exists
    const existingProduct = await Product.findOne({ pname: productData.pname });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    // Create and save new product
    const newProduct = new Product(productData);
    await newProduct.save();
    console.log("Product Created Successfully:", newProduct);

    return res.status(201).json({
      message: "New product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error.message);
    return res.status(500).json({ message: error.message });
  }
});

export default router; // Default export for clean import
