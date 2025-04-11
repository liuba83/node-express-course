const express = require("express");
console.log("Express Tutorial");
const app = express();
app.use(express.static("./public"));
const port = 3000;
app.listen(port);

const { products } = require("./data");

app.get("/api/v1/products", (req, res) => {
  res.json({ products });
});

app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);
  if (!product) {
    return res.status(404).send("404 - Product Not Found");
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

app.all("*", (req, res) => {
  res.status(404).send("404 - Page Not Found");
});
