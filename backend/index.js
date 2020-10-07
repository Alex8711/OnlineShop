import express from "express";
import dotenv from "dotenv";
import connectDB from "./connectDB.js";
import productsAPI from "./api/productsAPI.js";

dotenv.config();

connectDB();

const app = express();

app.use("/api/products", productsAPI);

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message || "An unknown error occurred!",
  });
});

app.listen(5000, console.log(`Server running on prot 5000`));
