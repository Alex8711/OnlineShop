import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Access denied");
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

export default auth;
