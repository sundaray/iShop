import Spinner from "../Spinner";

const ProductQuantity = ({
  product: { price, stockCount },
  setQty,
  handleCartItem,
  loading,
  success,
  error,
  setError,
}) => {
  return (
    <div className="w-1/5 h-60 flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <p>Price:</p>
        <p>${price}</p>
      </div>
      <hr></hr>
      <div className="flex justify-between items-center">
        <p>Status:</p>
        <p>{`${stockCount}` > 0 ? "In stock" : "Out of stcok"}</p>
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
        onClick={handleCartItem}
        disabled={loading}
        className={`shadow rounded px-2 py-2 ${
          success === true
            ? "bg-green-600 text-green-50"
            : "bg-blue-600 text-blue-50"
        }  hover:bg-blue-700 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <Spinner type="Adding..." />
        ) : success ? (
          "Added"
        ) : (
          "Add to cart"
        )}
      </button>
    </div>
  );
};

export default ProductQuantity;
