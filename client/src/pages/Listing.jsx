/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

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
                  className="h-[500px]"
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
    </main>
  );
}
