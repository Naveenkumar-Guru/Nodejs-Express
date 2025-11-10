// import jwt from "jsonwebtoken";

// let user_login = {
//   email: "naveenkumar@gmail.com",
//   password: "naveen123",
// };

// //3
// let secret_key = "DontTellAnyOne";
// let token = jwt.sign(user_login, "xyz");
// console.log(token);

// let user_data = jwt.verify(token, "xyz");
// console.log(user_data);

import jwt from "jsonwebtoken";

let user_payload = {
  email: "rg@gmail.com",
  password: "Tp123",
};
let secret_Key = "DontTellAnyOne";
let token = jwt.sign(user_payload, secret_Key);
console.log(token);

user_payload = jwt.verify(token, secret_Key);
console.log(user_payload);
