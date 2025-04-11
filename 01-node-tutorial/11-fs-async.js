const { readFile, writeFile } = require("fs");

console.log("start");

readFirstFile();

function readFirstFile() {
  readFile("./content/first.txt", "utf8", (err, result) => {
    if (err) return handleError(err);
    const first = result;
    readSecondFile(first);
  });
}

function readSecondFile(first) {
  readFile("./content/second.txt", "utf8", (err, result) => {
    if (err) return handleError(err);
    const second = result;
    writeResult(first, second);
  });
}

function writeResult(first, second) {
  writeFile(
    "./content/result-async.txt",
    `Here is the result : ${first}, ${second}`,
    (err) => {
      if (err) return handleError(err);
      console.log("done with this task");
    }
  );
}

function handleError(err) {
  console.log("An error occurred:", err);
}

console.log("starting next task");
