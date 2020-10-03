// import express from "express";
const express = require("express");
const products = require("./data/products");
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
