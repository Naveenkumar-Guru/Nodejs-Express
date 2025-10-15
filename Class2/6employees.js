// import fs, { readFile } from "fs";

// let emp_data = fs.readFileSync("6emp.JSON", "utf-8");
// console.log(typeof emp_data);

// let employee = JSON.parse(emp_data);
// for (let emp of employee) {
//   console.log(emp);
// }

import fs from "fs";

const data = fs.readFileSync("6emp.JSON", "utf-8");
console.log(typeof data);

let employee = JSON.parse(data);
for (let emp of employee) {
  console.log(emp);
}
