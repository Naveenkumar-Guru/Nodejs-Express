import express from "express";

import ProductModel from "../model/product.js";
let routes = express.Router();

routes.get("/all", async (req, resp) => {
  try {
    let products = await ProductModel.find();
    return resp.status(200).json(products);
  } catch (err) {
    return resp.status(500).json({ msg: err.msg });
  }
});

export default routes;
