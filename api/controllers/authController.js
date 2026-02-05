import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { errorHandler } from "../utils/error.js";

export async function signUp(req, res, next) {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User successfully created" });
  } catch (error) {
    next(error);
  }
}

export async function signIn(req, res, next) {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return next(errorHandler(400, "All fields are required"));

    const validUser = await User.findOne({ email }).select("+password");
    if (!validUser) return next(errorHandler(404, "User not found!"));

    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
}

export async function google(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    // if exist signin if not create one
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      const uniqueUsername =
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);

      const newUser = await User.create({
        username: uniqueUsername,
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
}

export async function signOut(req, res, next) {
  try {
    res
      .status(200)
      .clearCookie("access_token")
      .json({ message: "User has been loged out successfully!" });
  } catch (error) {
    next(error);
  }
}
