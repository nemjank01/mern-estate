/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaLocationDot,
  FaBed,
  FaBath,
  FaSquareParking,
  FaChair,
} from "react-icons/fa6";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const { id: listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchListing(listingId) {
      try {
        setIsLoading(true);

        const res = await fetch(`/api/v1/listings/${listingId}`);
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setIsLoading(false);
          console.log(data.message);
          return;
        }

        setIsLoading(false);
        setError(false);
        setListing(data);
        console.log(data);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    }

    fetchListing(listingId);
  }, [listingId]);

  return (
    <main>
      {isLoading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}

      {listing && (
        <>
          <Swiper navigation={true}>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[250px] sm:h-[500px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}

      <div className="p-6 sm:p-8 my-7 w-full max-w-4xl mx-auto flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">
          {listing?.name} - ${listing?.regularPrice} / month
        </h1>
        <p className="flex items-center gap-2">
          <span>
            <FaLocationDot className="text-green-800" />
          </span>
          New location
        </p>

        <div className="flex gap-4">
          <p className="text-white w-full bg-red-800 max-w-[200px] text-center py-1 px-2 rounded-md">
            {listing?.type === "rent" ? "For rent" : "For sale"}
          </p>
          {listing?.offer && (
            <p className="text-white w-full bg-green-800 max-w-[200px] text-center py-1 px-2 rounded-md">
              ${listing.regularPrice - +listing.discountPrice}{" "}
            </p>
          )}
        </div>

        <p className="text-slate-800">
          <span className="font-semibold text-black">Description - </span>
          {listing?.description}
        </p>

        <ul className="flex flex-wrap items-center gap-4 sm:gap-6 text-green-900 font-semibold text-sm">
          <li className="flex items-center gap-1 whitespace-nowrap ">
            <FaBed className="text-lg" />
            {listing?.bedrooms > 1
              ? `${listing?.bedrooms} beds`
              : `${listing?.bedrooms} bed`}
          </li>
          <li className="flex items-center gap-1 whitespace-nowrap ">
            <FaBath className="text-lg" />
            {listing?.bathrooms > 1
              ? `${listing?.bathrooms} baths`
              : `${listing?.bathrooms} bath`}
          </li>
          <li className="flex items-center gap-1 whitespace-nowrap ">
            <FaSquareParking className="text-lg" />
            {listing?.parking ? "Parking spot" : "No parking"}
          </li>
          <li className="flex items-center gap-1 whitespace-nowrap ">
            <FaChair className="text-lg" />
            {listing?.furnished ? "Furnished" : "Unfurnished"}
          </li>
        </ul>
      </div>
    </main>
  );
}
