import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { StarIcon } from "@heroicons/react/24/outline";

const ProductRating = ({ rating, noOfReviews }) => {
  const ratingNumber = Number(rating);

  return (
    <div className="flex items-center">
      <div className="mr-2 mb-2">
        {ratingNumber >= 1 ? (
          <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
        ) : ratingNumber >= 0.5 ? (
          <FontAwesomeIcon
            icon={faStarHalfStroke}
            className="text-yellow-400"
          />
        ) : (
          <StarIcon className="inline w-5 h-5 text-yellow-400" />
        )}
        {ratingNumber >= 2 ? (
          <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
        ) : ratingNumber >= 1.5 ? (
          <FontAwesomeIcon
            icon={faStarHalfStroke}
            className="text-yellow-400"
          />
        ) : (
          <StarIcon className="inline w-5 h-5 text-yellow-400" />
        )}
        {ratingNumber >= 3 ? (
          <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
        ) : ratingNumber >= 2.5 ? (
          <FontAwesomeIcon
            icon={faStarHalfStroke}
            className="text-yellow-400"
          />
        ) : (
          <StarIcon className="inline w-5 h-5 text-yellow-400" />
        )}
        {ratingNumber >= 4 ? (
          <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
        ) : ratingNumber >= 3.5 ? (
          <FontAwesomeIcon
            icon={faStarHalfStroke}
            className="text-yellow-400"
          />
        ) : (
          <StarIcon className="inline w-5 h-5 text-yellow-400" />
        )}
        {ratingNumber >= 5 ? (
          <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
        ) : ratingNumber >= 4.5 ? (
          <FontAwesomeIcon
            icon={faStarHalfStroke}
            className="text-yellow-400"
          />
        ) : (
          <StarIcon className="inline w-5 h-5 text-yellow-400" />
        )}
      </div>
      <div>
      <span className="mr-1">{noOfReviews}</span>
      <span>{`${noOfReviews > 1 ? "reviews" : "review"}`}</span>
      </div>
    </div>
  );
};

export default ProductRating;
