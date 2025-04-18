// GLOBALS  - NO WINDOW !!!!

// __dirname  - path to current directory
// __filename - file name
// require    - function to use modules (CommonJS)
// module     - info about current module (file)
// process    - info about env where the program is being executed

require("dotenv").config();

console.log(__dirname);
console.log(__filename);
console.log(process.env.MY_VAR);
console.log(module);
// setInterval(() => {
//   console.log("hello world");
// }, 1000);
