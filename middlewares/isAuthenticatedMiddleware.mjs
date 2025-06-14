import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../controllers/authController.mjs";

export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({ message: "Unauthorized access" });
  }
};
