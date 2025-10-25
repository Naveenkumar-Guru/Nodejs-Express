import express from "express";
import morgan from "morgan";
import userRouter from "./routes/userRouters.js";
import ProdRouter from "./routes/productRouter.js";
let app = express();
let port = 8080;
let host = "127.0.0.1";

app.get("/", (req, resp) => {
  return resp.json({ msg: "Appliction  root request " });
});

//enable middleware ie http logger
app.use(morgan("combined"));

//application routues
app.use("/user", userRouter);
app.use("/product", ProdRouter);

app.listen(port, host, (error) => {
  if (error) throw error;
  console.log(`Server is running... http://${host}:${port}`);
});
