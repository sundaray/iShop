import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchCartItems } from "../utils/firebase.config";
import { updateCartItem } from "../utils/firebase.config";
import { deleteCartItem } from "../utils/firebase.config";
import { auth } from "../utils/firebase.config";
import { cartItemsQtyContext } from "./_app";
import PageSpinner from "../components/shared/PageSpinner";
import { TrashIcon } from "@heroicons/react/24/solid";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [itemQty, setItemQty] = useState(null);
  const [cartItems, setCartItems] = useState(null);
  const [error, setError] = useState(false);
  const [totalPrice, setTotalPrice] = useState("");

  const [user] = useAuthState(auth);

  const { cartItemsQty, setCartItemsQty } = useContext(cartItemsQtyContext);

  useEffect(() => {
    fetchCartItems(setCartItems, user.uid);
    if (cartItems) {
      const totalPrice = cartItems.reduce((acc, item) => {
        return acc + item.price * item.qty;
      }, 0);
      setTotalPrice(totalPrice.toFixed(2));
    }
  }, [itemQty, cartItems, user.uid]);

  const handleDeleteCartItem = (id) => {
    deleteCartItem(id, user.uid);
    fetchCartItems(setCartItems, user.uid);
    setCartItemsQty(itemQty);
  };

  return (
    <>
      {loading ? (
        <PageSpinner />
      ) : (
        <main className="w-full lg:w-9/12 mt-32 mb-12 m-auto">
          <div className="flex flex-col items-center space-y-8 mb-12 ">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              {cartItemsQty > 0
                ? `Your cart total is $${totalPrice}.`
                : "Your cart is empty"}
            </p>
            <Link href={cartItemsQty > 0 ? "/checkout" : "/"}>
              <button
                className={`shadow rounded w-42 py-2 ${
                  cartItemsQty > 0
                    ? "bg-blue-600 text-blue-50 hover:bg-blue-700"
                    : "bg-gray-100 hover:bg-gray-200"
                } px-2  hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
              >
                {cartItemsQty > 0 ? "Check out" : "Continue shopping"}
              </button>
            </Link>
          </div>
          <div>
            {!cartItems ? (
              <PageSpinner />
            ) : (
              cartItems.map(({ name, id, price, qty, stockCount, imgUrls }) => (
                <div
                  key={id}
                  className="w-full md:w-4/5 lg:w-3/5 mb-8 px-4 lg:px-8 py-2 lg:py-4 bg-gray-100 rounded-xl flex justify-between items-center m-auto"
                >
                  <Image
                    priority
                    src={imgUrls[0]}
                    width={100}
                    height={100}
                    alt={name}
                  />
                  <select
                    className="bg-gray-100 first-line:leading-tight focus:outline-none cursor-pointer"
                    value={qty}
                    onChange={(event) => {
                      setItemQty(event.target.value);
                      const updatedQty = event.target.value;
                      updateCartItem(id, updatedQty, user.uid);
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
      )}
    </>
  );
};

export default Cart;
