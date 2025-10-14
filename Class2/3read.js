// import fs from "fs";
// let data = fs.readFileSync("3abc.txt", "utf-8");
// console.log(data);

import fs from "fs";
fs.readFile("3abc.txt", "utf-8", (error, data) => {
  if (error) throw error;
  console.log(data);
});


