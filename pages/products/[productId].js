import { useEffect, useState, useContext } from "react";
import { useAddToCart } from "../../components/store/globalStore";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  fetchProduct,
  fetchBoughtStatus,
  fetchProductReviews,
} from "../../utils/firebase.config";
import ProductImageGallery from "../../components/shared/product/ProductImageGallery";
import ProductDescription from "../../components/shared/product/ProductDescription";
import ProductQuantity from "./../../components/shared/product/ProductQuantity";
import ProductReviewForm from "../../components/shared/product/ProductReviewForm";
import ProductReviews from "../../components/shared/product/ProductReviews";
import PageSpinner from "../../components/shared/PageSpinner";
import PageError from "../../components/shared/error/PageError";
import { cartItemsQtyContext } from "../_app";

const Product = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState(null);
  const [productReviews, setProductReviews] = useState([]);
  const [boughtByUser, setBoughtByUser] = useState(false);
  const [userReviewed, setUserReviewed] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const [user] = useAuthState(auth);

  const addToCart = useAddToCart();

  const { setTotalCartQty } = useContext(cartItemsQtyContext);

  const productId =
    typeof window !== "undefined"
      ? window.location.pathname.split("/")[2]
      : null;

  useEffect(() => {
    fetchProduct(setLoading, setError, setProduct, productId);
  }, [productId]);

  useEffect(() => {
    if (user) {
      fetchBoughtStatus(productId, user.uid, setBoughtByUser);
    }
  }, [boughtByUser, user, productId]);

  useEffect(() => {
    fetchProductReviews(
      productId,
      setProductReviews,
      user?.uid,
      setUserReviewed
    );
  }, [user, productId]);

  if (loading) {
    return <PageSpinner />;
  }

  return (
    <>
      {error ? (
        <PageError error={error} setError={setError} />
      ) : product ? (
        <main className="product-page-container w-full mt-24 m-auto">
          <h1 className="product-name text-xl md:text-3xl lg:text-4xl text-gray-900 font-bold mb-4">
            AirPods Pro
          </h1>
          <ProductImageGallery product={product} />
          <ProductQuantity
            product={product}
            userId={user?.uid}
            setQty={setQty}
            handleCartItem={() => {
              addToCart(user?.uid, productId, qty);
              setTotalCartQty(qty);
            }}
            loading={loading}
            setError={setError}
          />
          <ProductDescription product={product} />
          {boughtByUser && !userReviewed && (
            <div className="write-review bg-blue-600 hover:bg-blue-700 text-gray-50 rounded w-40 px-2 py-2 mb-6 flex justify-between items-center transition-all">
              <h1 className=" text-blue-50">Write a review</h1>
              <ChevronDownIcon
                className="w-4 h-4 cursor-pointer"
                onClick={() => setShowReviewForm(!showReviewForm)}
              />
            </div>
          )}
          {showReviewForm && !userReviewed && (
            <ProductReviewForm userId={user?.uid} productId={productId} />
          )}
          {productReviews.length > 0 && (
            <ProductReviews productReviews={productReviews} />
          )}
        </main>
      ) : (
        ""
      )}
    </>
  );
};

export default Product;
