import htpp from "http";

let server = htpp.createServer((req, resp) => {
  resp.end("welcome to node js.....");
});

server.listen(8080, "127.0.0.1", (error) => {
  if (error) throw error;
  console.log("server Running");
});