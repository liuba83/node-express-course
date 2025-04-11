const { createReadStream } = require("fs");

// default 64kb
// last buffer - remainder
// highWaterMark - control size
// const stream = createReadStream('./content/big.txt', { highWaterMark: 90000 })
// const stream = createReadStream('../content/big.txt', { encoding: 'utf8' })
// const stream = createReadStream('./content/big.txt')

// stream.on('data', (result) => {
//   console.log(result)
// })
// stream.on('error', (err) => console.log(err))

const stream = createReadStream("./content/big.txt", {
  encoding: "utf8",
  highWaterMark: 200,
});

let chunkCount = 0;

stream.on("data", (chunk) => {
  chunkCount++;
  console.log(chunk);
});

stream.on("end", () => {
  console.log(`\nTotal chunks: ${chunkCount}`);
});

stream.on("error", (err) => {
  console.error("Stream error:", err);
});
