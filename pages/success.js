import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { cartItemsQtyContext } from "./_app";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import PageSpinner from "../components/shared/PageSpinner";
import { auth } from "../utils/firebase.config";
import { clearCartItems } from "../utils/firebase.config";
import { createOrderItems } from "../utils/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

const Success = () => {
  const [customerName, setCustomerName] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const [user] = useAuthState(auth);
  const { setCartItemsQty } = useContext(cartItemsQtyContext);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      const session_id = router.query.session_id;
      if (session_id && user) {
        const {
          data: { session },
        } = await axios.get(`/api/${router.query.session_id}`);
        if (session) {
          const customerName = session.customer_details.name;
          setCustomerName(customerName);
          createOrderItems(user?.uid);
          clearCartItems(user?.uid);
          setCartItemsQty(null);
        }
        setLoading(false);
      }
    };
    fetchCheckoutSession();
  }, [router.query.session_id, user, setCartItemsQty]);

  return (
    <>
      {loading ? (
        <PageSpinner />
      ) : customerName ? (
        <div className="w-2/5 h-auto flex flex-col items-center m-auto mt-24 p-2 space-y-4">
          <CheckCircleIcon className="w-10 h-10 text-green-600" />
          <h1 className="text-lg text-center">
            Thanks for the order {customerName}!
          </h1>
          <Link href="/">
            <button
              className="border rounded w-44 px-2 py-1 bg-gray-100 hover:border-gray-400
                  hover:shadow transition-all"
            >
              Continue shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="w-2/5 h-auto flex flex-col items-center m-auto mt-24 p-2 space-y-4 rounded bg-red-200">
          <ExclamationTriangleIcon className="w-7 h-7 text-red-600" />
          <h1 className="text-lg text-red-600 text-center">
            Sorry, it seems like the payment did not go through.
          </h1>
        </div>
      )}
    </>
  );
};

export default Success;
