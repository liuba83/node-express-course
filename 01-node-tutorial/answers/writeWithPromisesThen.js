const { writeFile, readFile } = require("fs").promises;

writeFile("temp.txt", "Line one\n")
  .then(() => writeFile("temp.txt", "Line two\n", { flag: "a" }))
  .then(() => writeFile("temp.txt", "Line three\n", { flag: "a" }))
  .then(() => readFile("temp.txt", "utf8"))
  .then((data) => console.log(data))
  .catch((err) => console.error("An error occurred:", err));
