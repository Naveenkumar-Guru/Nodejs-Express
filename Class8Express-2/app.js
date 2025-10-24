import express from "express";

const app = express();
const port = 8080;
const host = "127.0.0.1";

// Root route-> root Request
app.get("/", (req, resp) => {
  return resp.json({ msg: "root resp" });
});

// CREATE (POST) 127.0.0.1:8080/api/create
app.post("/api/create", (req, resp) => {
  return resp.json({ msg: "create request" });
});

// READ (GET)
app.get("/api/read", (req, resp) => {
  return resp.json({ msg: "read request......." });
});

// UPDATE
app.put("/api/update", (req, resp) => {
  return resp.json({ msg: "update request" });
});

// DELETE
app.delete("/api/delete", (req, resp) => {
  return resp.json({ msg: "delete request" });
});

// Start server
app.listen(port, host, (error) => {
  if (error) throw error;
  console.log(`Server running on http://${host}:${port}`);
});
