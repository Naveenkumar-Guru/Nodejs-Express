import fs from "fs";

fs.readFile("1Employee.json", "utf-8", (error, data) => {
  if (error) throw error;

  let employees = JSON.parse(data);

  let male_employees = employees.filter((emp) => emp.gender === "Male");

  console.log(male_employees.length);
});
