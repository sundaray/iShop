import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { cartItemsQtyContext } from "../_app";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase.config";
import { addToCart } from "../../utils/firebase.config";
import { fetchProduct } from "../../utils/firebase.config";
import { fetchReviewStatus } from "../../utils/firebase.config";
import ProductImageGallery from "../../components/shared/product/ProductImageGallery";
import ProductDescription from "../../components/shared/product/ProductDescription";
import ProductQuantity from "./../../components/shared/product/ProductQuantity";
import ProductReviewForm from "../../components/shared/product/ProductReviewForm";
import ProductReviews from "../../components/shared/product/ProductReviews";
import PageSpinner from "../../components/shared/PageSpinner";
import PageError from "../../components/shared/error/PageError";

const Product = () => {
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);
  const [boughtByUser, setBoughtByUser] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const { setCartItemsQty } = useContext(cartItemsQtyContext);

  const [user] = useAuthState(auth);

  const router = useRouter();

  const productId =
    typeof window !== "undefined"
      ? window.location.pathname.split("/")[2]
      : null;

  useEffect(() => {
    fetchProduct(setLoading, setError, setProduct, productId);
    if (user) {
      fetchReviewStatus(productId, user.uid, setBoughtByUser);
    }
  }, [boughtByUser, user, productId]);

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
        <main className="product-page-container w-full mt-24 m-auto">
          <h1 className="product-name text-xl md:text-3xl lg:text-4xl text-gray-900 font-bold mb-4">
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
          {boughtByUser && (
            <div className="write-review bg-gray-900 text-gray-50 rounded w-40 px-2 py-2 mb-6 flex justify-between items-center">
              <h1 className="text-gray-50">Write a review</h1>
              <ChevronDownIcon
                className="w-4 h-4 cursor-pointer"
                onClick={() => setShowReviewForm(!showReviewForm)}
              />
            </div>
          )}
          {showReviewForm && (
            <ProductReviewForm userId={user?.uid} productId={productId} />
          )}
        </main>
      ) : (
        ""
      )}
    </>
  );
};

export default Product;
