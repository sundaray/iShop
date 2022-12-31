import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase.config";
import { fetchProduct } from "../../utils/firebase.config";
import ProductImageGallery from "../../components/shared/product/ProductImageGallery";
import ProductDescription from "../../components/shared/product/ProductDescription";
import ProductQuantity from "./../../components/shared/product/ProductQuantity";
import { db } from "../../utils/firebase.config";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { cartItemsQtyContext } from "../_app";

const Product = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);

  const { setCartItemsQty } = useContext(cartItemsQtyContext);

  const [user] = useAuthState(auth);

  const router = useRouter();

  useEffect(() => {
    const productId = window.location.pathname.split("/")[2];
    fetchProduct(setProduct, productId);
  }, []);

  const handleAddToCart = async (product, qty, setLoading, setSuccess) => {
    const { name, description, price, stockCount, imgUrls } = product;


    if (user) {
      try {
        setLoading(true);
        const newCartItemRef = doc(collection(db, "cartItems"));
        await setDoc(newCartItemRef, {
          id: newCartItemRef.id,
          name,
          description,
          price,
          qty,
          stockCount,
          imgUrls,
          timestamp: serverTimestamp(),
        });
        setLoading(false);
        setSuccess(true);
        setCartItemsQty(qty);
        router.push("/cart");
      } catch (error) {
        setLoading(false);
        console.log("Error adding the product to cart", error.message);
      }  
    }
    if(!user) {
       router.query.from = `/products/${window.location.pathname.split("/")[2]}`;
        router.push({
          pathname: "/users/sign-in",
          query: { from: router.query.from },
      });
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <main className="w-11/12 mt-32 mb-12 m-auto flex flex-col space-y-16">
        <div className="flex justify-center items-center space-x-24 ">
          <ProductImageGallery product={product} />
          <ProductQuantity
            product={product}
            setQty={setQty}
            handleCartItem={() =>
              handleAddToCart(product, qty, setLoading, setSuccess, setError)
            }
            loading={loading}
            success={success}
            setError={setError}
          />
        </div>
        <ProductDescription product={product} />
      </main>
    </>
  );
};

export default Product;
