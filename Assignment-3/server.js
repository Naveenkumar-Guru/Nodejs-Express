import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import chalk from "chalk";
import connectDB from "./config/db.js"; // Import MongoDB connection

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Load environment variables first
dotenv.config({ path: "./dev.env" });
const port = process.env.PORT || 8080;
const host = process.env.HOST || "127.0.0.1";
const mongo_db_url = process.env.MONGO_DB_URL;

//  Connect to MongoDB
connectDB(mongo_db_url);

//  Test route
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Backend server running successfully" });
});

// Start the server
app.listen(port, host, (error) => {
  if (error) throw error;
  console.log(chalk.green(`✅ Server running at http://${host}:${port}`));
});
