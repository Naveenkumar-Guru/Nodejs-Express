import http from "http";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the server
const server = http.createServer((req, res) => {
  console.log("Request URL:", req.url);

  let filePath = "";

  if (req.url === "/" || req.url === "/index") {
    filePath = path.join(__dirname, "Html", "index.html");
  } else if (req.url === "/about") {
    filePath = path.join(__dirname, "Html", "about.html");
  } else if (req.url === "/services") {
    filePath = path.join(__dirname, "Html", "services.html");
  } else if (req.url === "/contact") {
    filePath = path.join(__dirname, "Html", "contact.html");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    return res.end("404 - Page Not Found");
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server Error");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});

server.listen(5500, () => {
  console.log("✅ Server is running at http://localhost:5500");
});
