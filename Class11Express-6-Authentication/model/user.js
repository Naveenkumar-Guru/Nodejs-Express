import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
  uname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  mobileno: {
    type: Number,
    require: true,
  },
});

export default user;
