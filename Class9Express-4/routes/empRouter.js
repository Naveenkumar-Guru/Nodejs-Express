import express from "express";
import fs from "fs";
import path from "path";
let router = express.Router();

// router.get("/create", (req, resp) => {
//   return resp.json({ msg: "hlooo" });
// });

/*
create
-------
usage: Create new employee
Rest API URL:http://127.0.0.1:8080/emp/create
Method Type:POST
Required Fields: eid,ename,esal,loc
Access Type:Public
*/

router.post("/create", async (req, resp) => {
  console.log("Inside POST Method");
  let emp = req.body;
  console.log(emp);
  let employees = await getEmployees();
  console.log(employees.length);
  let employee = employees.find((employee) => {
    return employee.eid === emp.eid;
  });
  console.log(employee);
  if (employee) {
    return resp.status(404).json({ msg: "Buddy! Employee Already Exists" });
  }

  employees.push(emp);
  await saveEmployee(employees);
  return resp.status(200).json({ msg: "new employee is create successfully" });
});
router.get("/read", async (req, resp) => {
  console.log("Inside post Method...");
  let employees = await getEmployees();
  return resp.status(200).json(employees);
  // return resp.status(200).send(JSON.stringify(employees, null, 2));
});

let getEmployees = () => {
  let emp_file = path.join(process.cwd(), "data", "employees.json");
  console.log(emp_file);
  let emp_Data = fs.readFileSync(emp_file, "utf-8");
  return JSON.parse(emp_Data);
};

let saveEmployee = (employees) => {
  let emp_file = path.join(process.cwd(), "data", "employees.json");
  console.log(emp_file);
  let emp_Data=fs.writeFileSync(emp_file, JSON.stringify(employees, null, 2), "utf-8");
  return JSON.parse(emp_Data);
};
export default router;
