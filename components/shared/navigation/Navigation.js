import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../../../utils/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

const Navigation = () => {
  const [user] = useAuthState(auth);

  const handleSignOut = () => {
    localStorage.removeItem("displayName");
    signOut(auth);
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
            <Link href="/users/sign-in">
              <li>Sign in</li>
            </Link>
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
