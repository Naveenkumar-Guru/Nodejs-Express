import express from "express";
import morgan from "morgan";
import chalk from "chalk";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import productRouter from "./routers/productRouter.js";

let app = express();

// env
dotenv.config({ path: "./config/dev.env" });
let port = process.env.PORT;
let host = process.env.HOST;
let mongo_db_url = process.env.MongoDB_LOCAL_URL;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

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
