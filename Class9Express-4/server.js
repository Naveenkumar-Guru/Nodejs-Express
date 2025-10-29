import express from "express";
import morgan from "morgan";
import chalk from "chalk";
import empRouter from "./routes/empRouter.js";

let port = 8080;
let host = "127.0.0.1";
let app = express();
app.use(morgan("dev"));

app.get("/", (req, resp) => {
  return resp.status(200).json({ msg: "hiii" });
});

app.use("/emp", empRouter);

app.listen(port, host, (error) => {
  if (error) throw error;
  //   console.log(chalk.red(`server is running in http://${host}:${port}`));
  console.log(`server is running in http://${host}:${port}`);
});
