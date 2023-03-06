import React, { useState, useEffect, createContext } from "react";
import "../styles/globals.css";
import { auth } from "../utils/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import Navigation from "../components/shared/navigation/Navigation";
import { useCartItems } from "../components/store/globalStore";

export const cartItemsQtyContext = createContext();

const App = ({ Component, pageProps }) => {
  const [totalCartQty, setTotalCartQty] = useState(null);

  const [user] = useAuthState(auth);
  const cartItems = useCartItems();
  const userCartItems = cartItems.filter((item) => item.userId === user?.uid);
  const userCartItemsQty = userCartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    setTotalCartQty(userCartItemsQty);
  }, [userCartItemsQty]);

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
