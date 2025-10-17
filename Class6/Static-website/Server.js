import http from "http";
import fs from "fs";
import path from "path";

const server = http.createServer((req, resp) => {
  //   console.log(req.url);
  if (req.url === "/" || req.url === "/index") {
    fs.readFile(
      path.join(process.cwd(), "Web", "data", "Html", "index.html"),
      "utf-8",
      (error, data) => {
        if (error) throw error;
        resp.end(data);
      }
    );
  }
  if (req.url === "/about") {
    fs.readFile(
      path.join(process.cwd(), "Web", "data", "Html", "about.html"),
      "utf-8",
      (error, data) => {
        if (error) throw error;
        resp.end(data);
      }
    );
  }
  if (req.url === "/services") {
    fs.readFile(
      path.join(process.cwd(), "Web", "data", "Html", "services.html"),
      "utf-8",
      (error, data) => {
        if (error) throw error;
        resp.end(data);
      }
    );
  }
  if (req.url === "/contact") {
    fs.readFile(
      path.join(process.cwd(), "Web", "data", "Html", "contact.html"),
      "utf-8",
      (error, data) => {
        if (error) throw error;
        resp.end(data);
      }
    );
  }
});

server.listen(8080, "127.0.0.1", (error) => {
  if (error) throw error;
  console.log("server is running..");
});
