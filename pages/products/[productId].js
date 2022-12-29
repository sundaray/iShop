import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchProduct } from "../../utils/firebase.config";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const Product = () => {
  const [product, setProduct] = useState(null);
  const [[page, direction], setPage] = useState([0, 0]);

  useEffect(() => {
    const productId = window.location.pathname.split("/")[2];
    fetchProduct(setProduct, productId);
  }, []);

  if (!product) {
    return <p>Loading...</p>;
  }

    const { imgUrls } = product;
    const imageIndex = wrap(0, imgUrls.length, page);
    const paginate = (newDirection) => {
      setPage([page + newDirection, newDirection]);
    };
  

  return (
    <>
      <div className="example-container border">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            src={product.imgUrls[imageIndex]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          />
        </AnimatePresence>
        <div className="next" onClick={() => paginate(1)}>
          {"‣"}
        </div>
        <div className="prev" onClick={() => paginate(-1)}>
          {"‣"}
        </div>
      </div>
      <div>
        {product && (
          <div className="border rounded w-1/5 mt-24 px-4 py-4">
            <h1 className="font-medium mb-4">{product.name}</h1>
            <h2 className="font-bold text-xl">${product.price}</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default Product;
