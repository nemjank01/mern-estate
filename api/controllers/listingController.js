import Listing from "../models/listingModel.js";
import { errorHandler } from "../utils/error.js";

export async function createListing(req, res, next) {
  try {
    const listing = await Listing.create(req.body);

    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
}

export async function deleteListing(req, res, next) {
  const listing = await Listing.findById(req.params.id);

  if (!listing) return next(errorHandler(404, "Listing not found!"));

  if (req.user.id !== listing.userRef.toString())
    return next(errorHandler(404, "You can only delete your own listings!"));

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Listing has been deleted!" });
  } catch (error) {
    next(error);
  }
}
