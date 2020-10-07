import express from "express";
import Product from "../models/productModel.js";
const router = express();

//get all products
router.get("/", async (req, res) => {
  const products = await Product.find({});
  if (products) {
    res.json(products);
  } else {
    const error = new Error("Products not found");
    error.statusCode = 404;
    throw error;
  }
});

//get a product by id
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }
});

export default router;
