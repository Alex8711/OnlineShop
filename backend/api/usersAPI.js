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
  isDuplicate = User.findOne({ email: email });
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
  await newUser.save();
  res.status(200).send({ user: newUser });
});

export default router;
