import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase.config";
import { db } from "../utils/firebase.config";
import { collection, query, getDocs } from "firebase/firestore";

const Home = () => {
  const [name, setName] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setName(localStorage.getItem("displayName") || null);

    const fetchProducts = async () => {
      const firestoreQuery = query(collection(db, "products"));
      const querySnapshot = await getDocs(firestoreQuery);
      const products = querySnapshot.docs.map((doc) => doc.data());
      setProducts(products);
    };

    fetchProducts();
  }, []);

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("displayName");
    setName(null);
    signOut(auth).then(() => {
      router.push("/");
    });
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Hello World!</h1>
      <div>
        {products &&
          products.map((product) => (
            <div key={product.id} className="border rounded w-1/5 px-2 py-2">
              <h1>Name: {product.name}</h1>
              <p>Description: {product.description}</p>
              <p>Price: {product.price}</p>
              <p>Stock count: {product.stockCount}</p>
            </div>
          ))}
      </div>
      <div>
        {!name && (
          <div className="fixed top-2 md:top-4 right-2 md:right-4 flex rounded-full">
            <Link href="/users/sign-in">
              <button className="signInButton bg-black text-yellow-300 text-sm transition-all font-medium  py-1 px-2 rounded-full">
                Sign in{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="inline w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </button>
            </Link>
          </div>
        )}
      </div>
      <div>
        {name && (
          <button
            onClick={handleLogout}
            className="fixed top-4 right-4 text-yellow-300 font-medium text-sm py-1 px-2 rounded-full border border-2 bg-black border-black hover:bg-black hover:text-gray-50 transition-all"
          >
            Log out
          </button>
        )}
      </div>
    </>
  );
};

export default Home;
