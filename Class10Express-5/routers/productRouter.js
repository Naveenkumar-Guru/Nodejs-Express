import express from "express";
import mongoose from "mongoose";
import Product from "../model/Product.js";
const productRouter = express.Router();

/*
============================================================
   ROUTE: Get All Products
   METHOD: GET
   URL: http://127.0.0.1:8000/product/all
   ACCESS: Public
   DESCRIPTION: Fetch all available products from the database
============================================================
*/
productRouter.get("/all", async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    console.error(" Error fetching products:", error.message);
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
productRouter.post("/create", async (req, res) => {
  try {
    const productData = req.body;
    console.log("Received Product Data:", productData);

    // Check if product already exists
    const existingProduct = await Product.findOne({ pname: productData.pname });
    if (existingProduct) {
      return res.status(400).json({ message: " Product already exists" });
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

  /*
============================================================
   ROUTE: Update Product by _id (MongoDB)
   METHOD: PUT
   URL: http://127.0.0.1:8000/product/update/:id
   ACCESS: Public
   REQUIRED FIELDS: pname, price, image, qty, info
   DESCRIPTION: Update existing product details by _id
============================================================
*/
});

productRouter.put("/update/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    console.log("Product ID:", productId);

    // Validate ID format before querying
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const updatedProductData = req.body;
    console.log("Updated Product Data:", updatedProductData);

    //Find and update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("Updated Product:", updatedProduct);
    return res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
});

/*
============================================================
   ROUTE: Delete Product by _id (MongoDB)
   METHOD: DELETE
   URL: http://127.0.0.1:8000/product/delete/:id
   ACCESS: Public
   DESCRIPTION: Delete product by its MongoDB _id
============================================================
*/
productRouter.delete("/delete/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    console.log("Product ID to delete:", productId);
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log("Deleted Product:", deletedProduct);

    return res
      .status(200)
      .json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

// Export router using camelCase
export default productRouter;
