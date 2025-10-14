import fs from "fs";

let emp_data = fs.readFileSync("6emp.json", "utf-8");
// console.log(typeof emp_data);

let employees = JSON.parse(emp_data);
for (let emp of employees) {
  console.log(emp);
}
