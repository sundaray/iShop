// import React from "react";
// import "../styles/globals.css";
// import Navigation from "../components/shared/navigation/Navigation";

// export default function App({ Component, pageProps }) {
//   return (
//     <>
//       <Navigation />
//       <Component {...pageProps} />
//     </>
//   );
// }

import React, { useState, useEffect, createContext } from "react";
import "../styles/globals.css";
import { auth } from "../utils/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import Navigation from "../components/shared/navigation/Navigation";
import PrivateRoute from "../components/shared/routeguard/privateRoute";
import { useTotalCartQty } from "../components/store/globalStore";

export const cartItemsQtyContext = createContext();

export default function App({ Component, pageProps }) {
  const [totalCartQty, setTotalCartQty] = useState(null);
  const globalTotalCartQty = useTotalCartQty();

  useEffect(() => {
    setTotalCartQty(globalTotalCartQty);
  }, [globalTotalCartQty]);

  const cartItems = {
    totalCartQty,
    setTotalCartQty,
  };

  return (
    <>
      <cartItemsQtyContext.Provider value={cartItems}>
        <Navigation />
        <Component {...pageProps} />
      </cartItemsQtyContext.Provider>
    </>
  );
}
