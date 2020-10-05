import express from "express";
import dotenv from "dotenv";
import connectDB from "./connectDB.js";
import products from "./data/products.js";

dotenv.config();

connectDB();

const app = express();

app.listen(5000, console.log(`Server running on prot 5000`));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.send(product);
});
