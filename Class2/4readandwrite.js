import fs from "fs";
let data = fs.readFileSync("3abc.txt", "utf-8");
fs.writeFileSync("xyz.txt", data);
console.log("new file created successfull");
