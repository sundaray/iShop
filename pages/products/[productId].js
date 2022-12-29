import { useEffect, useState } from "react";
import Link from "next/link"
import { fetchProduct } from "../../utils/firebase.config";
import Gallery from "../../components/shared/imageGallery/Gallery";

const Product = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const productId = window.location.pathname.split("/")[2];
    fetchProduct(setProduct, productId);
  }, []);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <Link href="/">
    <div className="goback absolute top-20 left-10 cursor-pointer flex items-center">
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
        <h2 className="font-medium ">
        Go back
      </h2>
      </div>
      </Link>

      <main className="w-11/12 mt-32 m-auto flex justify-center space-x-12">
        <Gallery imgUrls={product.imgUrls} />
        <div className="px-4 py-4 space-y-4">
          <p className="font-medium">{product.name}</p>
          <hr></hr>
          <p>Price: ${product.price}</p>
          <hr></hr>
          <p>Description: {product.description}</p>
        </div>
        <div className="px-4 py-4 space-y-4">
          <p>Price: ${product.price}</p>
          <p>
            Status: {`${product.stockCount}` > 0 ? "In stock" : "Out of stcok"}
          </p>
          <button className="rounded bg-gray-900 hover:shadow-md text-gray-50 px-2 py-1 transition-all">
            Add to cart
          </button>
        </div>
      </main>
    </>
  );
};

export default Product;
