import express from "express";

const app = express();
const port = 8080;
const host = "127.0.0.1";

// Root Request:API URL:127.0.0.1:8080/
app.get("/", (req, resp) => {
  return resp.json({ msg: "root resp" });
});

/*
create
usage:create user/emp/product/order
API:127.0.0.1:8080/api/create
Method:POST
Required Field:
Access Type:Public

*/
app.post("/api/create", (req, resp) => {
  return resp.json({ msg: "create request" });
});

/*
usage:Read user/emp/product/order
API:127.0.0.1:8080/api/read
Method:GET
Required Field
Access Type:Public
*/
app.get("/api/read", (req, resp) => {
  return resp.json({ msg: "read request......." });
});

/*
usage:update user/emp/product/order
API:127.0.0.1:8080/api/update
Method:PUT
Required Field:
Access Type:Public

*/
app.put("/api/update", (req, resp) => {
  return resp.json({ msg: "update request" });
});

/*usage:delete user/emp/product/order by id
API:127.0.0.1:8080/api/delete
Method:DELETE
Required Field:
Access Type:Public
*/

app.delete("/api/delete", (req, resp) => {
  return resp.json({ msg: "delete request" });
});

// Start server
app.listen(port, host, (error) => {
  if (error) throw error;
  console.log(`Server running on http://${host}:${port}`);
});
