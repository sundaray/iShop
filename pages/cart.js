import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { fetchCartItems } from "../utils/firebase.config";
import { updateCartItem } from "../utils/firebase.config";
import PageSpinner from "../components/shared/PageSpinner";
import { deleteCartItem } from "../utils/firebase.config";
import { cartItemsQtyContext } from "./_app";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [qty, setQty] = useState(null);
  const [cartItems, setCartItems] = useState(null);
  const [error, setError] = useState(false);

  const { setCartItemsQty } = useContext(cartItemsQtyContext);

  useEffect(() => {
    fetchCartItems(setCartItems);
  }, [qty]);

  const handleDeleteCartItem = (id) => {
    deleteCartItem(id);
    fetchCartItems(setCartItems);
    setCartItemsQty(qty);
  };

  return (
    <>
      <main className="w-9/12 mt-32 mb-12 m-auto">
        <div className="flex flex-col items-center space-y-8 mb-12 ">
          <p className="text-3xl font-medium text-gray-900">
            Your bag total is{" "}
          </p>
          <button className="shadow rounded w-40 py-2 bg-blue-600 text-blue-50 px-2 hover:bg-blue-700 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
            Check Out
          </button>
        </div>
        <div>
          {!cartItems ? (
            <PageSpinner />
          ) : (
            cartItems.map(({ name, id, price, qty, stockCount, imgUrls }) => (
              <div
                key={id}
                className="w-3/5 mb-8 px-8 py-4 bg-gray-100 rounded-md flex justify-between items-center m-auto"
              >
                <Image
                  priority
                  src={imgUrls[0]}
                  width={150}
                  height={150}
                  alt={name}
                />
                <select
                  className="bg-gray-100 first-line:leading-tight focus:outline-none cursor-pointer"
                  value={qty}
                  onChange={(event) => {
                    setQty(event.target.value);
                    const updatedQty = event.target.value;
                    updateCartItem(id, updatedQty);
                    setCartItemsQty(updatedQty);
                  }}
                >
                  {[...Array(stockCount).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>

                <p>${price}</p>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-gray-500 hover:text-gray-600 cursor-pointer transition-all"
                    onClick={() => handleDeleteCartItem(id)}
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
};

export default Cart;
