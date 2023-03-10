import { useState, useEffect } from "react";
import FormSubmissionSpinner from "../FormSubmissionSpinner";
import ProductRating from "./ProductRating";
import { fetchAverageRating } from "../../../utils/firebase.config";

const ProductQuantity = ({
  product: { id, price, stockCount },
  userId,
  setQty,
  addToCart,
  loading,
}) => {
  const [averageRating, setAverageRating] = useState(null);
  const [ratingCount, setRatingCount] = useState(null);

  useEffect(() => {
    fetchAverageRating(id, setAverageRating, setRatingCount);
  }, [userId, id]);

  return (
    <div className="product-quantity flex flex-col justify-between space-y-2 md:space-y-4">
      <div className="flex justify-between items-center">
        <p>Price:</p>
        <p>Rs. {price}</p>
      </div>
      <hr></hr>
      <div className="flex justify-between items-center">
        <p>Rating:</p>
        <ProductRating rating={averageRating} ratingCount={ratingCount} />
      </div>
      <hr></hr>
      <div className="flex justify-between items-center">
        <p>Status:</p>
        <p>{`${stockCount}` > 0 ? "In stock" : "Out of stock"}</p>
      </div>
      <hr></hr>
      <div className="flex justify-between items-center">
        <p>Quantity:</p>
        <select
          className="bg-gray-50 first-line:leading-tight focus:outline-none"
          onChange={(event) => {
            setQty(Number(event.target.value));
          }}
        >
          {[...Array(stockCount).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
      </div>
      <hr></hr>
      <button
        onClick={addToCart}
        disabled={loading}
        className="rounded px-2 py-2 bg-blue-600 text-blue-50 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <FormSubmissionSpinner text="Adding..." /> : "Add to cart"}
      </button>
    </div>
  );
};

export default ProductQuantity;
