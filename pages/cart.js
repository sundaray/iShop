import { useEffect, useState } from "react";
import Link from "next/link"
import { fetchCartItems } from "../utils/firebase.config";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [qty, setQty] = useState(1);
  const [cartItems, setCartItems] = useState(null);
  const [error, setError] = useState(false);


  useEffect(() => {
    fetchCartItems(setCartItems);
  }, []);
  

  if (!cartItems) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <main className="w-11/12 mt-32 mb-12 m-auto">
        <div className='flex flex-col items-center space-y-8'>
        <p className="text-3xl font-medium text-gray-900">Your bag total is </p>
        <button className="shadow rounded w-40 py-2 bg-blue-600 text-blue-50 px-2 hover:bg-blue-700 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Check Out
              </button>
        </div>
        <div>
          </div>
      </main>
    </>
  );
};

export default Cart;
