import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../../../utils/firebase.config";

const Navigation = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(localStorage.getItem("displayName") || null);
  }, []);

  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("displayName");
    setUser(null);
    signOut(auth).then(() => {
      router.push("/");
    });
  };

  return (
    <>
      <nav className="w-full h-16 px-4 bg-gray-900 text-gray-400 flex items-center justify-between">
        <Link href="/">
          <h1 className="font-bold">iShop</h1>
        </Link>
        <ul className="flex items-center space-x-4">
          <Link href="/cart">
            <li>Cart</li>
          </Link>
          {!user ? (
            ""
          ) : (
            <li onClick={handleSignOut} className="cursor-pointer">
              Sign out
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
