import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../../../utils/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

const Navigation = ({qty}) => {
  const [user] = useAuthState(auth);

  const handleSignOut = () => {
    localStorage.removeItem("displayName");
    signOut(auth);
  };

  return (
    <>
      <nav className="z-10 fixed top-0 right-0 w-full h-16 px-4 bg-gray-900 text-gray-300 flex items-center justify-between">
        <Link href="/">
          <h1 className="font-bold hover:text-gray-50 transition-all">iStore</h1>
        </Link>
        <ul className="flex items-center space-x-4 text-sm">
          <Link href="/cart">
            <li className="hover:text-gray-50 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="inline w-6 h-6 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              Cart {qty}
            </li>
          </Link>
          {!user ? (
            <Link href="/users/sign-in">
              <li className="hover:text-gray-50 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="inline w-6 h-6 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Sign in
              </li>
            </Link>
          ) : (
            <li
              onClick={handleSignOut}
              className="cursor-pointer hover:text-gray-50 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="inline w-6 h-6 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Sign out
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
