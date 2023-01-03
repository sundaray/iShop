import React from "react";
import { useRouter } from "next/router";

const Success = () => {
  const {
    query: { session_id },
  } = useRouter();

  return <h1>{session_id}</h1>;
};

export default Success;
