// import http from "http";
// import fs from "fs";
// import path from "path";

// const server = http.createServer((req, resp) => {
//   //   console.log(req.url);
//   if (req.url === "/" || req.url === "/index") {
//     fs.readFile(
//       path.join(process.cwd(), "Web", "data", "Html", "index.html"),
//       "utf-8",
//       (error, data) => {
//         if (error) throw error;
//         resp.end(data);
//       }
//     );
//   }
//   if (req.url === "/about") {
//     fs.readFile(
//       path.join(process.cwd(), "Web", "data", "Html", "about.html"),
//       "utf-8",
//       (error, data) => {
//         if (error) throw error;
//         resp.end(data);
//       }
//     );
//   }
//   if (req.url === "/services") {
//     fs.readFile(
//       path.join(process.cwd(), "Web", "data", "Html", "services.html"),
//       "utf-8",
//       (error, data) => {
//         if (error) throw error;
//         resp.end(data);
//       }
//     );
//   }
//   if (req.url === "/contact") {
//     fs.readFile(
//       path.join(process.cwd(), "Web", "data", "Html", "contact.html"),
//       "utf-8",
//       (error, data) => {
//         if (error) throw error;
//         resp.end(data);
//       }
//     );
//   }
// });

// server.listen(8080, "127.0.0.1", () => {
//   console.log("Server is running at http://127.0.0.1:8080/");
// });
import http from "http";
import fs from "fs";
import path from "path";

const server = http.createServer((req, res) => {
  const routes = {
    "/": "index.html",
    "/index": "index.html",
    "/about": "about.html",
    "/services": "services.html",
    "/contact": "contact.html",
  };

  const fileName = routes[req.url];

  if (fileName) {
    const filePath = path.join(process.cwd(), "Web", "data", "Html", fileName);

    fs.readFile(filePath, "utf-8", (error, data) => {
      if (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end("Internal Server Error");
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else {
    // Handle 404 errors
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Page Not Found");
  }
});

server.listen(8080, "127.0.0.1", () => {
  console.log("✅ Server is running at http://127.0.0.1:8080/");
});
