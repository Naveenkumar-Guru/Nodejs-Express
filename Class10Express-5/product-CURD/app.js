import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import chalk from "chalk";
import cors from "cors";

import productRouter from "./routers/productRouter.js";

let app = express();
//read form Data
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


// load appliction - environment variable
dotenv.config({ path: "./config/dev.env" });
let port = process.env.PORT;
let host = process.env.HOST;
let mongo_db_url = process.env.MongoDB_LOCAL_URL;

//Appliction root request
app.get("/", (req, resp) => {
  return resp.status(200).json({ msg: "Appliction root resquest" });
});

app.use("/product", productRouter);

mongoose
  .connect(mongo_db_url, {})
  .then((resp) => {
    console.log("mongodb connection successfully");
  })
  .catch((err) => {
    console.log("Unable to connect MongoDB");
    process.exit(1);
  });

app.listen(port, host, (error) => {
  if (error) throw error;
  console.log(`server is running in http://${host}:${port}`);
});
