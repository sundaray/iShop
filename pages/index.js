import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchProducts } from "../utils/firebase.config";
import PageSpinner from "../components/shared/PageSpinner";
import PageError from "../components/shared/error/PageError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts(setProducts, setLoading, setError);
  }, []);

  return (
    <>
      {loading ? (
        <PageSpinner />
      ) : error ? (
        <PageError error={error} setError={setError} />
      ) : (
        <main className="w-11/12 mt-24 m-auto">
          <div className="flex flex-wrap">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col justify-between border rounded shadow-sm w-1/5 mr-4 mb-4 px-4 py-4"
              >
                <Image
                  src={product.imgUrls[0]}
                  width={500}
                  height={500}
                  alt="Picture of the product"
                  className="rounded mb-4"
                  priority
                />
                <div>
                  <Link href={`/products/${product.id}`}>
                    <h1 className="font-medium mb-2 hover:underline transition-all">
                      {product.name}
                    </h1>
                  </Link>
                  <h2 className="font-medium">Rs. {product.price}</h2>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}
    </>
  );
};

export default Home;
