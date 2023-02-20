import React, { useState, useEffect, createContext } from "react";
import "../styles/globals.css";
import { auth } from "../utils/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchCartItemsQty } from "../utils/firebase.config";
import Navigation from "../components/shared/navigation/Navigation";
import PrivateRoute from "../components/shared/routeguard/PrivateRoute";

export const cartItemsQtyContext = createContext();

const protectedRoutes = ["/admin/upload-product", "/cart"];

export default function App({ Component, pageProps }) {
  const [cartItemsQty, setCartItemsQty] = useState(null);

  const [user] = useAuthState(auth);

  useEffect(() => {
    fetchCartItemsQty(setCartItemsQty, user?.uid);
  }, [cartItemsQty, user?.uid]);

  const cartItems = {
    cartItemsQty,
    setCartItemsQty,
  };

  return (
    <>
      <cartItemsQtyContext.Provider value={cartItems}>
        <PrivateRoute protectedRoutes={protectedRoutes}>
          <Navigation />
          <Component {...pageProps} />
        </PrivateRoute>
      </cartItemsQtyContext.Provider>
    </>
  );
}
