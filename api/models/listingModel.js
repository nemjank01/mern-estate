import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    isFurnished: {
      type: Boolean,
      required: true,
    },
    hasParking: {
      type: Boolean,
      required: true,
    },
    type: {
      //rent or sale
      type: String,
      required: true,
    },
    isOffer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
      default: [
        "https://www.paranych.com/uploads/benefits-penthouse-living-main-image.png",
        "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2018/2/8/1/CI_Halstead_History-of-Penthouses-6.jpg.rend.hgtvcom.1280.720.85.suffix/1518139442662.webp",
        "https://www.imtilak.net/crop/798/469/posts/fe08852eeadb1d1458d97981e6aea56cQsS616.webp",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbNHK91Mp5f2O8MsRrkhNeDeNfoIVLe9P-8A&s",
        "https://limassolblumarine.com/wp-content/uploads/2022/11/24-102-Blue-Marine-penthouse-c02b-1-scaled.jpg",
        "https://d18slle4wlf9ku.cloudfront.net/atlantiscasino.com-1116647142/cms/cache/v2/66d782512c861.jpg/1920x1080/fit/80/6228ff8ce2482cc6dd78d0f852731c29.jpg",
      ],
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
