import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth } from "../../../utils/firebase.config";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const Navigation = ({ qty }) => {
  const [user] = useAuthState(auth);

  const router = useRouter();

  const handleSignOut = () => {
    signOut(auth);
    router.push("/");
  };

  return (
    <>
      <nav className="z-10 fixed top-0 right-0 w-full h-16 px-4 bg-gray-900 text-gray-300 flex items-center justify-between">
        <Link href="/">
          <h1 className="font-bold hover:text-gray-50 transition-all">
            iStore
          </h1>
        </Link>
        <ul className="flex items-center space-x-4 text-sm">
          <Link href="/cart">
            <li className="hover:text-gray-50 transition-all">
              <ShoppingCartIcon className="inline w-6 h-6 mr-1" />
              Cart {user ? qty : ""}
            </li>
          </Link>
          {!user ? (
            <Link href="/users/sign-in">
              <li className="hover:text-gray-50 transition-all">
                <UserCircleIcon className="inline w-6 h-6 mr-1"/>
                Sign in
              </li>
            </Link>
          ) : (
            <li
              onClick={handleSignOut}
              className="cursor-pointer hover:text-gray-50 transition-all"
            >
              <UserCircleIcon className="inline w-6 h-6 mr-1"/>
              Sign out
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
