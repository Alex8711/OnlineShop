import express from "express";
import dotenv from "dotenv";
import connectDB from "./connectDB.js";
import productsAPI from "./api/productsAPI.js";
import usersAPI from "./api/usersAPI.js";
import testAPI from "./api/testToken.js";
import uploadAPI from './api/uploadAPI.js'
import path from 'path';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/api/products", productsAPI);
app.use("/api/users", usersAPI);
app.use("/api/upload", uploadAPI);
app.use("/api", testAPI);

const __dirname = path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

app.use((err, req, res, next) => {
  res.status(err.code || statusCode);
  res.json({
    message: err.message || "An unknown error occurred!",
  });
});

app.listen(5000, console.log(`Server running on prot 5000`));
