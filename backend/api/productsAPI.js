import express from "express";
import Product from "../models/productModel.js";
import auth from "./verifyToken.js";
import admin from './verifyAdmin.js';
import HttpError from '../models/http-error.js';

const router = express();

//get all products
router.get("/", async (req, res,next) => {
  const products = await Product.find({});
  if (products) {
    res.json(products);
  } else {
    return next(new HttpError("Products not found", 404));
  }
});

//get a product by id
router.get("/:id", async (req, res,next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    return next(new HttpError("Product not found", 404));
  }
});


//delete a product
// /api/products/:id
// only for admin
router.delete("/:id",auth,admin, async (req, res,next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove()
    res.json({message:"Product removed"})
  } else {
  
    return next(new HttpError("Product not found", 404)); 
  }
});

//create a product
// /api/products
// only for admin
router.post("/",auth,admin, async (req, res,next) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })
  const createdProduct = await product.save();
  res.status(201).json(createdProduct)
  
});


//update a product
// /api/products/:id
// only for admin
router.put("/:id",auth,admin, async (req, res,next) => {
  const{name,price,description,image,brand,category,countInStock}=req.body;
  const product = await Product.findById(req.params.id);
  if(product){
    product.name=name;
    product.price=price;
    product.description=description;
    product.image=image;
    product.brand=brand;
    product.category=category;
    product.countInStock=countInStock;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct)
  }else{
    return next(new HttpError("Product not found", 404)); 
  }

  
  
});

export default router;
