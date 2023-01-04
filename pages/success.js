import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { CheckIcon } from "@heroicons/react/24/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const Success = () => {
  const [customerName, setCustomerName] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      const session_id = router.query.session_id;
      if (session_id) {
        const {
          data: { session },
        } = await axios.get(`/api/${router.query.session_id}`);
        if (session) {
          const customerName = session.customer_details.name;
          setCustomerName(customerName);
        }
      }
    };
    fetchCheckoutSession();
  }, [router.query.session_id]);

  return (
    <>
      {customerName && (
        <div className="w-2/5 h-auto flex flex-col items-center m-auto mt-24 p-2 space-y-4 border rounded bg-gray-100">
          <CheckIcon className="w-6 h-6 text-green-600" />
          <h1 className="text-lg">Thanks for the order {customerName}!</h1>
        </div>
      )}

      {!customerName && (
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
