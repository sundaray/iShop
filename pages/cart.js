import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { fetchCartItems } from "../utils/firebase.config";
import { updateCartItem } from "../utils/firebase.config";
import PageSpinner from "../components/shared/PageSpinner";
import { deleteCartItem } from "../utils/firebase.config";
import { cartItemsQtyContext } from "./_app";
import { TrashIcon } from "@heroicons/react/24/solid";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [itemQty, setItemQty] = useState(null);
  const [cartItems, setCartItems] = useState(null);
  const [error, setError] = useState(false);
  const [totalPrice, setTotalPrice] = useState("");

  const { setCartItemsQty } = useContext(cartItemsQtyContext);

  useEffect(() => {
    fetchCartItems(setCartItems);
    if (cartItems) {
      const totalPrice = cartItems.reduce((acc, item) => {
        return acc + item.price * item.qty;
      }, 0);
      setTotalPrice(totalPrice.toFixed(2));
    }
  }, [itemQty, cartItems]);

  const handleDeleteCartItem = (id) => {
    deleteCartItem(id);
    fetchCartItems(setCartItems);
    setCartItemsQty(itemQty);
  };

  return (
    <>
      <main className="w-9/12 mt-32 mb-12 m-auto">
        <div className="flex flex-col items-center space-y-8 mb-12 ">
          <p className="text-3xl font-medium text-gray-900">
            {`Your bag total is $${totalPrice}`}
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
                    setItemQty(event.target.value);
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
                <TrashIcon
                  onClick={() => handleDeleteCartItem(id)}
                  className="cursor-pointer h-5 w-5 text-gray-500 hover:text-gray-600 transition-all"
                />
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
};

export default Cart;
