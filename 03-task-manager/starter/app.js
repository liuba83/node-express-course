console.log("Task Manager App");

const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();

//middleware
app.use(express.json());

//routes
app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

app.use("/api/v1/tasks", tasks);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening port ${port}`));
    console.log("CONNECTED TO THE DB...");
  } catch (error) {
    console.log(error);
  }
};

start();

// app.listen(port, console.log(`server is listening port ${port}`));
