/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const images = [
  "https://www.paranych.com/uploads/benefits-penthouse-living-main-image.png",
  "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2018/2/8/1/CI_Halstead_History-of-Penthouses-6.jpg.rend.hgtvcom.1280.720.85.suffix/1518139442662.webp",
  "https://www.imtilak.net/crop/798/469/posts/fe08852eeadb1d1458d97981e6aea56cQsS616.webp",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbNHK91Mp5f2O8MsRrkhNeDeNfoIVLe9P-8A&s",
  "https://limassolblumarine.com/wp-content/uploads/2022/11/24-102-Blue-Marine-penthouse-c02b-1-scaled.jpg",
  "https://d18slle4wlf9ku.cloudfront.net/atlantiscasino.com-1116647142/cms/cache/v2/66d782512c861.jpg/1920x1080/fit/80/6228ff8ce2482cc6dd78d0f852731c29.jpg",
];

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({});

  async function handleImageUpload(e) {
    e.preventDefault();

    //logic for uploading images to firebase
    // now firebase storage is not anymore free

    setFormData({ ...formData, imageUrls: files });
  }

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>

      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border border-slate-500 p-3 rounded-lg "
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border border-slate-500 p-3 rounded-lg "
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border border-slate-500 p-3 rounded-lg "
            id="address"
            required
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="bg-white p-3 border border-gray-300 rounded-lg "
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="bg-white p-3 border border-gray-300 rounded-lg "
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                required
                className="bg-white p-3 border border-gray-300 rounded-lg "
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                required
                className="bg-white p-3 border border-gray-300 rounded-lg "
              />
              <div className="flex flex-col items-center">
                <p>Discount price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:{" "}
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="p-3 border border-gray-300 rounded w-full"
              onChange={(e) => setFiles(images)}
            />
            <button
              type="button"
              onClick={handleImageUpload}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:text-white hover:bg-green-700 isabled:opacity-80 transition-all"
            >
              Upload
            </button>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 transition-all">
            Create listing
          </button>
        </div>
      </form>
    </main>
  );
}
