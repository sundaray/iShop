import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckIcon } from "@heroicons/react/24/solid";

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

  if(customerName) {
    console.log(customerName);
  }

  return (
    <div className="w-1/4 h-auto flex flex-col items-center m-auto mt-24 p-2 space-y-4 border rounded bg-gray-100">
      <CheckIcon className="w-10 h-10 text-green-600" />
      <h1 className="text-2xl">Thanks for the order!</h1>
    </div>
  );
};

export default Success;
