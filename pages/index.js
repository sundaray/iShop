import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchProducts } from "../utils/firebase.config";
import PageSpinner from "../components/shared/PageSpinner";
import Navigation from "../components/shared/navigation/Navigation";


const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts(setProducts);
  }, []);


  if(!products) {
    return <PageSpinner />
  }


  return (  
    <>
    <Navigation />
    <main className="mt-24">
      <div>
        {!products ? <PageSpinner /> :
          products.map((product) => (
            <div key={product.id} className="border rounded shadow-sm w-1/5 px-4 py-4">
              <Image
                src={product.imgUrls[0]}
                width={500}
                height={500}
                alt="Picture of the product"
                className="rounded mb-4"
                priority
              />
              <Link href={`/products/${product.id}`}>
                <h1 className="font-medium mb-4">{product.name}</h1>
              </Link>
              <h2 className="font-medium">${product.price}</h2>
            </div>
          ))}
      </div>
    </main>
    </>
  );
};

export default Home;
