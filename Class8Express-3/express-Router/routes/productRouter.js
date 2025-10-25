import express from "express";

const router = express.Router();

router.post("/", (req, resp) => {
  return resp.json({ msg: "Product  created" });
});

router.put("/pid", (req, resp) => {
  let Prod_id = req.params.pid;
  console.log(Prod_id);
  return resp.json({ msg: "product updated", "product id": "prod_id" });
});

export default router;
