import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import chalk from "chalk";
import productRouter from "./routers/productRouter.js";

const app = express();

dotenv.config({ path: "./config/dev.env" });
let port = process.env.PORT;
let host = process.env.HOST;
let MONGO_DB_URL = process.env.MONGO_DB_URL;

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, resp) => {
  return resp.status(200).json({ msg: "Application Root request" });
});

app.use("/product", productRouter);

//mongo db connection
mongoose
  .connect(MONGO_DB_URL, {})
  .then((req) => {
    console.log("MongoDB Connection Successfully Done");
  })
  .catch((error) => {
    console.log(error);
    // process.exit(1);
  });

app.listen(port, host, (error) => {
  if (error) throw error;
  console.log(`server is running in http://${host}:${port}`);
});
