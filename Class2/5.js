import fs from "fs";
fs.readFile("3abc.txt", "utf-8", (error, data) => {
  if (error) throw error;
  fs.writeFile("xyz.txt", data, (error) => {
    if (error) throw error;
    console.log("new file created successfully........");
  });
});
