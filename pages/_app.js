import React, { useState, useEffect, createContext } from "react";
import "../styles/globals.css";
import PrivateRoute from "../components/shared/routeguard/PrivateRoute";
import Navigation from "../components/shared/navigation/Navigation";
import { fetchCartItemsQty } from "../utils/firebase.config";

export const cartItemsQtyContext = createContext();

const protectedRoutes = ["/admin/product-upload", "/cart"];

export default function App({ Component, pageProps }) {
  const [cartItemsQty, setCartItemsQty] = useState(null);

  useEffect(() => {
    fetchCartItemsQty(setCartItemsQty);
  }, [cartItemsQty]);

  const cartItems = {
    cartItemsQty,
    setCartItemsQty,
  };

  return (
    <>
      <cartItemsQtyContext.Provider value={cartItems}>
        <PrivateRoute protectedRoutes={protectedRoutes}>
          <Navigation qty={cartItemsQty} />
          <Component {...pageProps} />
        </PrivateRoute>
      </cartItemsQtyContext.Provider>
    </>
  );
}
