import express from "express";
import bcrypt from "bcrypt";
import Joi from "@hapi/joi";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
const router = express();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(5).required(),
  });
  let validateRes;
  try {
    validateRes = await schema.validateAsync({ name, email, password });
  } catch (error) {
    return res.send("Please input valid name,email and password!");
  }

  let isDuplicate;
  isDuplicate = await User.findOne({ email: email });
  if (isDuplicate) {
    return res.send("the Email is already registered!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await new User({
    name,
    email,
    password: hashedPassword,
  });
  const savedUser = await newUser.save();
  const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.header("auth-token", token);
  res.status(200).send({ user: newUser, token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const schema = Joi.object({
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(5).required(),
  });
  let validateRes;
  try {
    validateRes = await schema.validateAsync({ email, password });
  } catch (error) {
    return res.send("Please input valid email and password!");
  }

  const queryResult = await User.findOne({ email: email });
  if (!queryResult) {
    return res.send("User does not exist!");
  }
  let verifyPwd;
  try {
    verifyPwd = await bcrypt.compare(password, queryResult.password);
  } catch (error) {
    console.log(error);
    return res.send("credential issue of this account");
  }
  if (!verifyPwd) {
    return res.send("credential issue of this account");
  }
  const token = jwt.sign({ _id: queryResult._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.header("auth-token", token);
  res.status(200).send({ user: queryResult, token });
});

export default router;
