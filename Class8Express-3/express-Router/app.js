import express from "express";
import morgan from "morgan";
import userRouter from "./routes/userRouters.js";

const app = express();
const port = 8080;
const host = "127.0.0.1";

app.get("/", (req, resp) => {
  return resp.json({ msg: "root router" });
});

app.use(morgan("combined"));

app.use("/user", userRouter);
app.use("/product", ProdRouter);

app.listen(port, host, (error) => {
  if (error) throw error;
  console.log(`server is running http://${host}${port}`);
});
