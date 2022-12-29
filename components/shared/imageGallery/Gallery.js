import React from "react";
import { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Gallery = ({ imgUrls }) => {
  return (
    <div className="border rounded w-1/3">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        {imgUrls.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: `url(${image}) center no-repeat`,
                backgroundSize: "contain",
              }}
              className="w-full h-80"
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Gallery;
