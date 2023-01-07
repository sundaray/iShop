import ProductRating from "./ProductRating";

const ProductReviews = ({ reviews, noOfReviews }) => {
  return (
    <div className="product-reviews">
      <h1 className="font-medium text-gray-900 text-xl mb-6">
        Customer Reviews
      </h1>
      {reviews.map(({ id, rating, review }) => (
        <div key={id} className="mb-12">
          <ProductRating rating={rating} noOfReviews={noOfReviews} />
          <p>{review}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductReviews;
