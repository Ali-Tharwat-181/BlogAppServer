import jwt from "jsonwebtoken";
import "dotenv/config";
import { getOneUser, addUser } from "../services/authServices.mjs";

export const JWT_SECRET = process.env.JWT_SECRET;

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await getOneUser({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!user.password || !isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { email: user.email, _id: user._id, role: user.role },
    JWT_SECRET,
    {
      expiresIn: "12h",
    }
  );

  res.status(200).json({ token, user });
};

export const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await getOneUser({ email });

  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const newUser = { name, email, password };
  await addUser(newUser);

  res.status(201).json({ message: "User registered successfully" });
};
