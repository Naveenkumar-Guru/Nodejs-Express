import express from "express";
let router = express.Router();

router.post("/", (req, resp) => {
  return resp.json({ msg: "user create successfully " });
});

router.get("/all", (req, resp) => {
  return resp.json({ msg: "Getting all users" });
});


router.put("/:uid", (req, resp) => {
  console.log(req.params(uid));
  let uid = req.params.uid;
});

router.delete("/:uid", (req, resp) => {
  console.log(req.params(uid));
  let uid = req.params.uid;
});

export default router;
