import ProductRating from "./ProductRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ProductReviews = ({ productReviews }) => {
  return (
    <div className="product-reviews">
      <h1 className="font-medium text-gray-900 text-xl mb-6">
        Customer Reviews
      </h1>
      {productReviews.map(({ id, userName, rating, review, reviewDate }) => (
        <div key={id} className="mb-12">
          <p className="font-medium mb-2">
            {" "}
            <FontAwesomeIcon icon={faUser} className="text-gray-600 mr-2" />
            {userName} (
            <span className="text-sm">
              reviewd on {reviewDate.toDate().toDateString()}
            </span>
            )
          </p>
          <ProductRating rating={rating} />
          <p>{review}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductReviews;
