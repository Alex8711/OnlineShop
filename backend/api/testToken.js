import express from "express";
const router = express.Router();
import auth from "./verifyToken.js";

router.get("/test", auth, (req, res) => {
  res.status(200).send({ message: "these are posts data" });
});

export default router;
