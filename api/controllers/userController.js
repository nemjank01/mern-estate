import { errorHandler } from "../utils/error.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import Listing from "../models/listingModel.js";

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

export async function deleteUser(req, res, next) {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account!"));

  try {
    await User.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .clearCookie("access_token")
      .json({ message: "User deleted successfully!" });
  } catch (error) {
    next(error);
  }
}

export async function getUserListings(req, res, next) {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only view your own listings!"));

  try {
    const listings = await Listing.find({ userRef: req.params.id });
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
}

export async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(errorHandler(404, "Use not found!"));

    const { password: pass, ...rest } = user;

    res.status(200).json(rest._doc);
  } catch (error) {
    next(error);
  }
}
