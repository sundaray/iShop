import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { StarIcon } from "@heroicons/react/24/outline";

const ProductRating = ({ rating, ratingCount = 0 }) => {
  return (
    <>
      <div className="flex items-center mb-2">
        {rating >= 1 ? (
          <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
        ) : rating >= 0.5 ? (
          <FontAwesomeIcon
            icon={faStarHalfStroke}
            className="text-yellow-400"
          />
        ) : (
          <StarIcon className="inline w-5 h-5 text-yellow-400" />
        )}
        {rating >= 2 ? (
          <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
        ) : rating >= 1.5 ? (
          <FontAwesomeIcon
            icon={faStarHalfStroke}
            className="text-yellow-400"
          />
        ) : (
          <StarIcon className="inline w-5 h-5 text-yellow-400" />
        )}
        {rating >= 3 ? (
          <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
        ) : rating >= 2.5 ? (
          <FontAwesomeIcon
            icon={faStarHalfStroke}
            className="text-yellow-400"
          />
        ) : (
          <StarIcon className="inline w-5 h-5 text-yellow-400" />
        )}
        {rating >= 4 ? (
          <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
        ) : rating >= 3.5 ? (
          <FontAwesomeIcon
            icon={faStarHalfStroke}
            className="text-yellow-400"
          />
        ) : (
          <StarIcon className="inline w-5 h-5 text-yellow-400" />
        )}
        {rating >= 5 ? (
          <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
        ) : rating >= 4.5 ? (
          <FontAwesomeIcon
            icon={faStarHalfStroke}
            className="text-yellow-400"
          />
        ) : (
          <StarIcon className="inline w-5 h-5 text-yellow-400" />
        )}
        {ratingCount > 0 ? <span className="ml-1">{ratingCount}</span> : ""}
      </div>
    </>
  );
};

export default ProductRating;
