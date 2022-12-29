import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    <div className="mt-24">
      <Gallery imgUrls={product.imgUrls} />
      <div>
        {product && (
          <div className="border rounded w-1/5 mt-24 px-4 py-4">
            <h1 className="font-medium mb-4">{product.name}</h1>
            <h2 className="font-bold text-xl">${product.price}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
