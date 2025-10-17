import fs from "fs";

const emp_data = fs.readFileSync("1Employees.json", "utf-8");
let employee = JSON.parse(emp_data);
let male_employees = []; 

for (let emp of employee) {
  if (emp.gender === "Male") {
    male_employees.push(emp);
  }
  fs.writeFileSync("male.JSON", JSON.stringify(male_employees));
}

console.log(male_employees.length);
