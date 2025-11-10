import bcrypt from "bcrypt";

let user = {
  email: "naveen@123gmail.com",
  mobile: "1234567890",
  CC: "9876543210123416",
  pwd: "today123",
};

let salt = bcrypt.genSaltSync(10);
let new_pwd = bcrypt.hashSync(user.pwd, salt);
console.log(user.pwd);
console.log(new_pwd);

let result = bcrypt.compareSync("today123", new_pwd);
console.log(result);

if (result) {
  console.log("login success");
} else {
  console.log("login failed");
}
