import { errorHandler } from "../utils/error.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export function test(req, res) {
  res.json({ message: "test ruta" });
}

export async function updateUser(req, res, next) {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));

  try {
    let hashedPassword;
    if (req.body.password) {
      hashedPassword = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          avatar: req.body.avatar,
        },
      },
      { new: true },
    );

    const { password, ...rest } = updatedUser._doc;

    return res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
}
