import mongoose from "mongoose";
let ProductSchema = new mongoose.Schema({
  pname: {
    require: true,
    type: String,
  },
  price: {
    require: true,
    type: Number,
  },
  qty: {
    require: true,
    type: Number,
  },
  image: {
    require: true,
    type: String,
  },
  info: {
    require: true,
    type: String,
  },
});
let productModel = mongoose.model("products", ProductSchema); //products is a colleations names
export default productModel;
