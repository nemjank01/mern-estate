import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export async function signup(req, res, next) {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
}
