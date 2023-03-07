import React, { useState, useEffect, createContext } from "react";
import "../styles/globals.css";
import { auth } from "../utils/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCartQtyByUser } from "../components/store/globalStore";
import Navigation from "../components/shared/navigation/Navigation";

export const cartItemsQtyContext = createContext();

const App = ({ Component, pageProps }) => {
  const [totalCartQty, setTotalCartQty] = useState(null);

  const [user] = useAuthState(auth);
  const userCartQty = useCartQtyByUser()[user?.uid];

  useEffect(() => {
    setTotalCartQty(userCartQty);
  }, [userCartQty]);

  const cart = {
    totalCartQty,
    setTotalCartQty,
  };

  return (
    <>
      <cartItemsQtyContext.Provider value={cart}>
        <Navigation />
        <Component {...pageProps} />
      </cartItemsQtyContext.Provider>
    </>
  );
};

export default App;
