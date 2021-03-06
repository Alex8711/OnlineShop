import express from "express";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import HttpError from "../models/http-error.js";
import auth from "./verifyToken.js";
import admin from './verifyAdmin.js';

const router = express();

//register
router.post("/register", async (req, res, next) => {
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
    return next(
      new HttpError("Please input valid name,email and password!", 500)
    );
  }
  if (!validateRes) {
    return next(
      new HttpError("Please input valid name,email and password!", 500)
    );
  }

  let isDuplicate;
  isDuplicate = await User.findOne({ email: email });
  if (isDuplicate) {
    return next(new HttpError("the Email is already registered!", 500));
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
  res.status(201).send({
    _id: savedUser._id,
    name: savedUser.name,
    email: savedUser.email,
    isAdmin: savedUser.isAdmin,
    token,
  });
});

//login
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

  if (!validateRes) {
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

// get user cart
router.get("/cart", auth, async (req, res, next) => {
  
  let userInfo
  try {
    userInfo=await User.findById(req.user._id).populate("cart.product");
    console.log(userInfo);
    res.json(userInfo);
  } catch (error) {
    return next(new HttpError("CartInfo not found", 404));
  }
    
});

// add product to user cart
router.post("/cart", auth, async (req, res, next) => {
  const{productId,qty} =req.body
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    let duplicate = false;

    userInfo.cart.forEach(cartInfo => {
      if (cartInfo.product == productId) {
        duplicate = true;
      }
    });
    if (duplicate) {
      User.findOneAndUpdate(
        {
          _id: req.user._id,
          "cart.product": productId
        },
        {
          $inc: { "cart.$.quantity": qty }
        },
        {
          new: true
        },
        (err,userInfo) => {
          if(err){
            return next(new HttpError("Add to Cart Failed", 500))
          }
          res.status(200).json({productId,qty});
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              product: productId,
              quantity: qty,
              date: Date.now()
            }
          }
        },
        { new: true },
        (err, userInfo) => {
          if(err){
            return next(new HttpError("Add to Cart Failed", 500))
          }
          res.status(200).json({productId,qty});
        }
      );
    }
  });
});


//remove the product(s) from cart
// /api/products/:id
// only for admin
router.delete("/cart/:id",auth, async (req, res,next) => {
  const id = req.params.id;
  console.log(id);
  User.findOneAndUpdate({_id:req.user._id},{$pull:{cart:{product:id}}},{new:true},(err,userInfo)=>{
    
    if(err){
      return next(new HttpError("Remove to Cart Failed", 500))
    }
    return res.status(200).json("Removed Successfully")
  })
});

// update user profile
router.put("/profile", auth, async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const { name, email, password } = req.body;
  const schemaName = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const schemaEmail = Joi.object({
    email: Joi.string().min(6).email().required(),
  });
  const schemaPassword = Joi.object({
    password: Joi.string().min(5).required(),
  });

  if (user) {
    if (name) {
      let validateRes;
      try {
        validateRes = await schemaName.validateAsync({ name });
      } catch (error) {
        console.log(error);
        return next(
          new HttpError("Please input valid name,at least 3 characters", 500)
        );
      }
      if (validateRes) {
        user.name = name;
      } else {
        return next(
          new HttpError("Please input valid name,at least 3 characters", 500)
        );
      }
    } else {
      user.name = user.name;
    }

    if (email) {
      let validateRes;
      try {
        validateRes = await schemaEmail.validateAsync({ email });
      } catch (error) {
        return next(new HttpError("Please input valid email", 500));
      }
      if (validateRes) {
        user.email = email;
      } else {
        return next(new HttpError("Please input valid email", 500));
      }
    } else {
      user.email = user.email;
    }
    if (password) {
      let validateRes;
      try {
        validateRes = await schemaPassword.validateAsync({
          password,
        });
      } catch (error) {
        return next(
          new HttpError(
            "Please input valid password,at least 5 characters",
            500
          )
        );
      }
      if (validateRes) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
      } else {
        return next(
          new HttpError(
            "Please input valid password,at least 5 characters",
            500
          )
        );
      }
    } else {
      user.password = user.password;
    }
    const updatedUser = await user.save();
    let token;
    try {
      token = jwt.sign({ _id: updatedUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
    } catch (error) {
      return next(
        new HttpError("Logging in failed, please try again later.", 500)
      );
    }
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token,
    });
  } else {
    return next(new HttpError("User not found", 404));
  }
});

//get all users
// 
// Private/ only for admin
router.get("/", auth,admin, async (req, res, next) => {
  const users = await User.find({});

  if (users) {
    res.json(users);
  } else {
    return next(new HttpError("Users not found", 404));
  }
});

// Delete user
// 
// Private/ only for admin
router.delete("/:id", auth,admin, async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({message:"user removed"})
  } else {
    return next(new HttpError("User not found", 404));
  }
});


export default router;
