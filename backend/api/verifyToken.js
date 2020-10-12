import jwt from "jsonwebtoken";
import HttpError from "../models/http-error.js";
import User from "../models/userModel.js";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded).select("-password");

    next();
  } catch (err) {
    const error = HttpError("Authentication failed!", 401);
    return next(error);
  }
};

export default auth;
