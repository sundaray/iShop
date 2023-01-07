const ProductReviews = ({ reviews }) => {
  return (
    <div className="product-reviews">
      <h1 className="font-medium text-gray-900 text-xl">Customer Reviews</h1>
      {reviews.map(({ id, rating, review }) => (
        <div key={id}>
          <p>{rating}</p>
          <p>{review}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductReviews;
