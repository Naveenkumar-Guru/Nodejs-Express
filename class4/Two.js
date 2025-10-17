import path from "path";

console.log(path.join(process.cwd()));
console.log(path.join(process.cwd(), "employees"));
console.log(path.join(process.cwd(), "employees", "data"));
console.log(path.join(process.cwd(), "employees", "data", "employees.json"));
