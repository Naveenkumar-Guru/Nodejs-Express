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
let Product = mongoose.model("products", ProductSchema);
export default Product;
