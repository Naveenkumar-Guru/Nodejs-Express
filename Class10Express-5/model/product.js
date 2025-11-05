import mongoose from "mongoose";

let ProductSchema = new mongoose.Schema({
  pname: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  qty: {
    type: Number,
    require: true,
  },
  info: {
    type: String,
    require: true,
  },
});

let product = mongoose.model("product", ProductSchema);

export default product;
