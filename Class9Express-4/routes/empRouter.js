import express from "express";
import fs from "fs";
import path from "path";

let router = express.Router();

/*
create
-------
Usage: Create new employee
REST API URL: http://127.0.0.1:8080/emp/create
Method Type: POST
Required Fields: eid, ename, esal, loc
Access Type: Public
*/

// POST → Create a new employee
router.post("/create", async (req, resp) => {
  console.log("Inside POST Method");

  let emp = req.body;
  console.log(emp);
  let employees = await getEmployees();
  console.log("Total Employees:", employees.length);

  let employee = employees.find((employee) => employee.eid === emp.eid);
  if (employee) {
    return resp.status(400).json({ msg: "Buddy! Employee Already Exists" });
  }
  employees.push(emp);
  await saveEmployees(employees);

  return resp.status(201).json({ msg: "New employee created successfully" });
});

/*
read
----
Usage: Get all employees
REST API URL: http://127.0.0.1:8080/emp/read
Method Type: GET
Access Type: Public
*/
router.get("/read", async (req, resp) => {
  console.log("Inside GET Method...");
  let employees = await getEmployees();
  return resp.status(200).json(employees);
});

/*
update
-------
Usage: Update existing employee
REST API URL: http://127.0.0.1:8080/emp/update/:eid
Method Type: PUT
Required Fields: eid, ename, esal, loc
Access Type: Public
*/

// PUT → Update an existing employee
router.put("/update/:eid", async (req, resp) => {
  let empId = parseInt(req.params.eid);
  console.log("Employee ID:", empId);
  let emp_Data = req.body;

  let employees = await getEmployees();
  let employee = employees.find((emp) => emp.eid === empId);
  if (!employee) {
    return resp.status(404).json({ msg: "Employee Not Exists" });
  }
  let updatedEmployees = employees.map((emp) =>
    emp.eid === empId ? emp_Data : emp
  );

  await saveEmployees(updatedEmployees);
  return resp.status(200).json({ msg: "Employee Updated Successfully" });
});

/*
delete
-------
Usage: Delete employee by ID
REST API URL: http://127.0.0.1:8080/emp/delete/:eid
Method Type: DELETE
Required Fields: none
Access Type: Public
*/

// DELETE → Remove an employee
router.delete("/delete/:eid", async (req, resp) => {
  let empId = parseInt(req.params.eid);
  console.log("Employee ID to delete:", empId);

  let employees = await getEmployees();
  let employee = employees.find((emp) => emp.eid === empId);
  if (!employee) {
    return resp.status(404).json({ msg: "Employee not exists" });
  }

  let remaining_Employees = employees.filter((emp) => emp.eid !== empId);
  await saveEmployees(remaining_Employees);

  return resp.status(200).json({ msg: "Employee Deleted Successfully" });
});

// ---------------- Helper Functions ----------------

let getEmployees = () => {
  let emp_file = path.join(process.cwd(), "data", "employees.json");
  return JSON.parse(fs.readFileSync(emp_file, "utf-8"));
};

let saveEmployees = (employees) => {
  let emp_file = path.join(process.cwd(), "data", "employees.json");
  fs.writeFileSync(emp_file, JSON.stringify(employees, null, 2), "utf-8");
};

export default router;
