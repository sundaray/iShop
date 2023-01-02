import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { cartItemsQtyContext } from "../_app";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase.config";
import { addToCart } from "../../utils/firebase.config";
import { fetchProduct } from "../../utils/firebase.config";
import ProductImageGallery from "../../components/shared/product/ProductImageGallery";
import ProductDescription from "../../components/shared/product/ProductDescription";
import ProductQuantity from "./../../components/shared/product/ProductQuantity";
import PageSpinner from "../../components/shared/PageSpinner";
import PageError from "../../components/shared/error/PageError";

const Product = () => {
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);

  const { setCartItemsQty } = useContext(cartItemsQtyContext);

  const [user] = useAuthState(auth);

  const router = useRouter();

  useEffect(() => {
    const productId = window.location.pathname.split("/")[2];
    fetchProduct(setLoading, setError, setProduct, productId);
  }, []);

  const handleAddToCart = (product, qty, setLoading, setError) => {
    if (user) {
      const userId = user.uid;
      addToCart(router, userId, product, qty, setLoading, setError);
      setCartItemsQty(qty);
    }
    if (!user) {
      router.query.from = `/products/${window.location.pathname.split("/")[2]}`;
      router.push({
        pathname: "/users/sign-in",
        query: { from: router.query.from },
      });
    }
  };

  return (
    <>
      {loading ? (
        <PageSpinner />
      ) : error ? (
        <PageError error={error} setError={setError} />
      ) : product ? (
        <main className="product-page-container w-full mt-24 m-aut">
          <h1 className="product-name text-4xl text-gray-900 font-bold mb-4">
            AirPods Pro
          </h1>
            <ProductImageGallery product={product} />
            <ProductQuantity
              product={product}
              setQty={setQty}
              handleCartItem={() =>
                handleAddToCart(product, qty, setLoading, setError)
              }
              loading={loading}
              setError={setError}
            />
          <ProductDescription product={product} />
        </main>
      ) : (
        ""
      )}
    </>
  );
};

export default Product;
