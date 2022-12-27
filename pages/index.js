import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase.config";

export async function getServerSideProps() {
  return {
    props: {},
  };
}

const Home = () => {
  const [name, setName] = useState(null);

  useEffect(() => {
    setName(localStorage.getItem("displayName") || null);
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
