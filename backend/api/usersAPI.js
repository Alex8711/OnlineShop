import express from "express";
import bcrypt from "bcrypt";
import Joi from "@hapi/joi";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import HttpError from "../models/http-error.js";
import auth from "./verifyToken.js";
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

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const schema = Joi.object({
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(5).required(),
  });
  let validateRes;
  try {
    validateRes = await schema.validateAsync({ email, password });
  } catch (error) {
    return next(new HttpError("Please input valid email and password!", 401));
  }

  let queryResult;
  try {
    queryResult = await User.findOne({ email: email });
  } catch (error) {
    return next(
      new HttpError("Logging in failed, please try again later.", 500)
    );
  }

  if (!queryResult) {
    return next(
      new HttpError("Invalid credentials, could not log you in.", 500)
    );
  }

  let verifyPwd = false;
  try {
    verifyPwd = await bcrypt.compare(password, queryResult.password);
  } catch (error) {
    return next(
      new HttpError(
        "Could not log you in, please check your credentials and try again.",
        500
      )
    );
  }

  if (!verifyPwd) {
    return next(
      new HttpError("Invalid credentials, could not log you in.", 403)
    );
  }

  let token;
  try {
    token = jwt.sign({ _id: queryResult._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  } catch (error) {
    return next(
      new HttpError("Logging in failed, please try again later.", 500)
    );
  }

  res.status(200).json({
    _id: queryResult._id,
    name: queryResult.name,
    email: queryResult.email,
    isAdmin: queryResult.isAdmin,
    token,
  });
});

// get user profile
router.get("/profile", auth, async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    return next(new HttpError("User not found", 404));
  }
});

export default router;
