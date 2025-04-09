const express = require("express");
console.log("Express Tutorial");
const app = express();
// app.use(express.static("./public"));
app.use(express.static("./methods-public"));
const port = 3000;
app.listen(port);

const { products, people } = require("./data");
const router = require("./routes/people");

//middleware function
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  next();
};

//invoke middleware function
app.use(logger);

app.get("/api/v1/products", (req, res) => {
  res.json({ products });
});

app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);
  if (!product) {
    res.status(404).send("404 - Product Not Found");
  }
  res.json(product);
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;
  let filteredProducts = [...products];

  // Filter by search
  if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().startsWith(search.toLowerCase())
    );
  }

  // Limit the number of results
  if (limit) {
    const limitNumber = parseInt(limit);
    if (!isNaN(limitNumber)) {
      filteredProducts = filteredProducts.slice(0, limitNumber);
    }
  }

  // Return result
  if (filteredProducts.length < 1) {
    return res.status(200).json({ success: true, data: [] });
  }

  res.status(200).json({ success: true, data: filteredProducts });
});

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

//week4
// app.get("/api/v1/people", (req, res) => {
//   res.json({ people });
// });

//parse body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/people", router);

// app.post("/api/v1/people", (req, res) => {
//   if (!req.body.name) {
//     res.status(400).json({ success: false, message: "Please provide a name" });
//   }
//   people.push({ id: people.length + 1, name: req.body.name });
//   res.status(201).json({ success: true, name: req.body.name });
// });

//if page not found
app.all("*", (req, res) => {
  res.status(404).send("404 - Page Not Found");
});
