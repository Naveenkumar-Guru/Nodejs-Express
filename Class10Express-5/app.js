import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import chalk from "chalk";

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

app.listen(port, host, (error) => {
  if (error) throw error;
  console.log(`server is running in http://${host}:${port}`);
});
