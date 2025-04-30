const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("start", (msg) => {
  console.log("Started:", msg);
  emitter.emit("progress", 50);
});

emitter.on("progress", (percent) => {
  console.log(`Progress: ${percent}%`);
  if (percent === 50) {
    emitter.emit("complete", "Done!");
  }
});

emitter.on("complete", (msg) => {
  console.log("Completed:", msg);
});

emitter.emit("start", "Initializing...");
