import express from "express";
import Product from "../models/product.js";
let router = express.Router();

/*
usage:Fetch all Products
URL:http://127.0.0.8080/product/all
Method:GET
Required Fields:None
Access Type:Public
*/
router.get("/all", async (req, resp) => {
  console.log("Inside router get");
  try {
    let products = await Product.find();
    return resp.status(200).json(products);
  } catch (err) {
    return resp.status(500).json({ msg: err.msg });
  }
});

export default router;
