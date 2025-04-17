const { writeFile, readFile } = require("fs").promises;

async function writer() {
  try {
    await writeFile("temp.txt", "Line one\n");
    await writeFile("temp.txt", "Line two\n", { flag: "a" });
    await writeFile("temp.txt", "Line three\n", { flag: "a" });
  } catch (err) {
    console.error("Write error:", err);
  }
}

async function reader() {
  try {
    const data = await readFile("temp.txt", "utf8");
    console.log(data);
  } catch (err) {
    console.error("Read error:", err);
  }
}

async function readWrite() {
  await writer();
  await reader();
}

readWrite();
