import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchProduct } from "../../utils/firebase.config";

const Product = () => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const productId = window.location.pathname.split("/")[2];
    fetchProduct(setProduct, productId);
  }, []);

  return (
    <div>
      {product && <div className="border rounded w-1/5 px-4 py-4">
        <h1 className="font-medium mb-4">{product.name}</h1>
        <h2 className="font-bold text-xl">${product.price}</h2>
      </div>}
    </div>
  );
};

export default Product;
