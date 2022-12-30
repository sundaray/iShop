import { useEffect, useState } from "react";
import Link from "next/link";
import {useRouter} from "next/router"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase.config";
import { fetchProduct } from "../../utils/firebase.config";
import ProductImageGallery from "../../components/shared/product/ProductImageGallery";
import ProductDetails from "../../components/shared/product/ProductDetails";
import ProductQuantity from './../../components/shared/product/ProductQuantity';
import { AddToCart } from "../../utils/firebase.config";

const Product = () => {
  const [qty, setQty] = useState(0);
  const [product, setProduct] = useState(null);

  const [user] = useAuthState(auth);

  const router = useRouter()

  useEffect(() => {
    const productId = window.location.pathname.split("/")[2];
    fetchProduct(setProduct, productId);
  }, []);

  const handleAddToCart = () => {
    if(!user) {
      router.push("/users/sign-in")
    }else {
      AddToCart(product, qty);
    }
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Link href="/">
        <div className="goback absolute top-20 left-4 sm:left-8 cursor-pointer flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="inline w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
          <h2 className="font-medium ">Go back</h2>
        </div>
      </Link>

      <main className="w-11/12 mt-32 mb-12 m-auto flex justify-center space-x-16 ">
        <ProductImageGallery product={product} />
        <ProductDetails product={product}/>
        <ProductQuantity product={product} setQty={setQty} handleCartItem={handleAddToCart}/>
      </main>
    </>
  );
};

export default Product;
