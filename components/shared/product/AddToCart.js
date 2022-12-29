const AddToCart = ({product: {price, stockCount}, setQty}) => {
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
            <p>Qty:</p>
            <select
              className="border rounded leading-tight focus:outline-none"
              onChange={(event) => setQty(event.target.value)}
            >
              {[...Array(stockCount).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>
          <hr></hr>
          <div className="flex justify-between items-center py-1">
          <button className="rounded bg-gray-900 hover:shadow-md text-gray-50 px-2 py-1 transition-all">
            Add to cart
          </button>
          </div>
        </div>
    );
  };
  
  export default AddToCart;
  