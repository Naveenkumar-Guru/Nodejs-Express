import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import chalk from "chalk";

const app = express();

app.use(morgan("dev"));

dotenv.config({ path: "./config/dev.env" });
let port = process.env.PORT;
let host = process.env.HOST;
let mongodb_url = process.env.MONGODB_URL;

app.get("/", (req, resp) => {
  return resp.status(200).json({ msg: "Appliation root request" });
});


app.listen(port)
