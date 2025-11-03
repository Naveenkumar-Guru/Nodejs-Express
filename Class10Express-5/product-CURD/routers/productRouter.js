import express from "express";
import productModel from "../models/product.js";

const router = express.Router();

/*
Usage: Fetch all Products
URL: http://127.0.0.1:8080/product/all
Method: GET
Required Fields: None
Access Type: Public
*/
router.get("/all", async (req, resp) => {
  console.log("Inside router get");
  try {
    const products = await productModel.find();
    return resp.status(200).json(products);
  } catch (err) {
    return resp.status(500).json({ msg: err.message });
  }
});

/*
Usage: Create a new Product
URL: http://127.0.0.1:8080/product/create
Method: POST
Required Fields: pname, price, etc.
Access Type: Public
*/
router.post("/create", async (req, resp) => {
  try {
    const product_data = req.body;

    // Check if product already exists
    const product = await productModel.findOne({ pname: product_data.pname });
    if (product) {
      return resp.status(400).json({ msg: "Product already exists" });
    }

    // Create new product
    const new_product = new Product(product_data);
    await new_product.save();

    return resp
      .status(201)
      .json({ msg: "New product created", product: new_product });
  } catch (err) {
    return resp.status(500).json({ msg: err.message });
  }
});

router.put("/update/:id", async (req, resp) => {
  try {
    let product_Id = req.params.id;
    console.log(product_Id);
    let product = await productModel.findById(product_Id);
    console.log(product);
    if (!product) {
      return resp.status(200).json({ msg: "product not exits" });
    }

    let update_product_data = req.body;
    product = await productModel.findByIdAndUpdate(product_Id, {
      $set: update_product_data,
    });
    return resp
      .status(200)
      .json({ msg: "product update successfully", product });
  } catch (error) {
    return resp.status(500).json({ msg: error.message });
  }
});

router.delete("/delete/:id", async (req, resp) => {
  try {
    let product_Id = req.params.id;
    console.log(product_Id);
    let product = await productModel.findById(product_Id);
    console.log(product);
    if (!product) {
      return resp.status(200).json({ msg: "product not exits" });
    }
    product = await productModel.findByIdAndDelete(product_Id);
    return resp
      .status(200)
      .json({ msg: "product delete successfully", product });
  } catch (error) {
    return resp.status(500).json({ msg: error.message });
  }
});

export default router;
