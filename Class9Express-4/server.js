import express from "express";
import morgan from "morgan";
import chalk from "chalk";
import empRouter from "./routes/empRouter.js";
import dotenv from "dotenv";

// let port = 8080;
// let host = "127.0.0.1";
let app = express();

dotenv.config({ path: "./config/dev.env" });
let port=process.env.port;
let host=process.env.host;

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, resp) => {
  return resp.status(200).json({ msg: "Application Root Request" });
});

//forward all employee api to empRouter file
app.use("/emp", empRouter);

app.listen(port, host, (error) => {
  if (error) throw error;
  //   console.log(chalk.red(`server is running in http://${host}:${port}`));
  console.log(`server is running in http://${host}:${port}`);
});
