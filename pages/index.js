import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchProducts } from "../utils/firebase.config";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts(setProducts);
  }, []);


  return (
    <main>
      <div>
        {products &&
          products.map((product) => (
            <div key={product.id} className="border rounded w-1/5 px-4 py-4">
              <Image
                src={product.imgUrls[0]}
                width={500}
                height={500}
                alt="Picture of the product"
                className="rounded shadow-sm mb-4"
              />
              <Link href={`/products/${product.id}`}>
                <h1 className="font-medium mb-4">{product.name}</h1>
              </Link>
              <h2 className="font-bold text-xl">${product.price}</h2>
            </div>
          ))}
      </div>
    </main>
  );
};

export default Home;
