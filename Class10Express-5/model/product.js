import mongoose from "mongoose";

let ProductSchema = new mongoose.Schema({
  pname: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
});

let product = mongoose.model("product", ProductSchema);

export default product;
