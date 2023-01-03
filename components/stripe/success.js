import React, { useEffect, useState } from "react";
import axios from "axios";
import { Check } from "@heroicons/react/24/solid";

const Success = () => {
  const [customerName, setCustomerName] = useState(null);

  useEffect(() => {
    const fetchCustomerName = async () => {
      const { name } = await axios.get("/api/customer");
      if (name) {
        setCustomerName(name);
      }
    };
    fetchCustomerName();
  }, []);

  return (
    <>
      {customerName ? (
        <div className="flex flex-col items-center">
          <h1>
            <Check />
            Thanks for the order {customerName}!
          </h1>
        </div>
      ) : (
        <h1>Sorry, it looks like the payment did not go through.</h1>
      )}
    </>
  );
};

export default Success;
