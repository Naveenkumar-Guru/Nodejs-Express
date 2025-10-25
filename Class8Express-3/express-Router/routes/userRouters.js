import express from "express";
let router = express.Router();

/*
Usage:New User Create
Rest URL:http://127.0.0.1:8080/user/
Method Type:POST
Requried Fields:uname,email,loc
Access Type:Public
*/
router.post("/", (req, resp) => {
  return resp.json({ msg: "user create successfully " });
});

/*
Usage:fetch all users
Rest URL:http://127.0.0.1:8080/user/all
Method Type:GET
Requried Fields:None
Access Type:Public
*/

//get meathod out put only show in browser and postman too
router.get("/all", (req, resp) => {
  return resp.json({ msg: "Getting all users" });
});

//Cannot GET /all

/*
Usage:Updtae user by uid
Rest URL:http://127.0.0.1:8080/user/103
Method Type:PUT
Requried Fields:uname,email,loc
Access Type:Public
*/

router.put("/:uid", (req, resp) => {
  console.log(req.params.uid);
  let uid = req.params.uid;
  return resp.json({ msg: "User update", uid: uid });
});

router.delete("/:uid", (req, resp) => {
  console.log(req.params.uid);
  let uid = req.params.uid;
});

export default router;
