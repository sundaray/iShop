import { useContext } from "react";
import { cartItemsQtyContext } from "../../../pages/_app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth } from "../../../utils/firebase.config";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const cartVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const Navigation = ({ qty }) => {
  const [user] = useAuthState(auth);

  const router = useRouter();
  
  const { cartItemsQty } = useContext(cartItemsQtyContext);
  
  const handleSignOut = () => {
    signOut(auth).then(() => router.replace("/"))
  };

  return (
    <>
      <nav className="z-10 fixed top-0 right-0 w-full h-16 px-4 bg-gray-900 text-gray-300 flex items-center justify-between">
        <Link href="/">
          <h1 className="font-bold hover:text-gray-50 transition-all">
            iStore
          </h1>
        </Link>
        <div className="flex items-center space-x-4 text-sm">
          <Link href="/cart">
            <div className="relative flex items-center hover:text-gray-50 transition-all">
              <ShoppingCartIcon className="inline w-6 h-6 mr-1" />
              <AnimatePresence>
                {user && cartItemsQty > 0 ? (
                  <motion.div
                    variants={cartVariants}
                    initial="initial"
                    animate="animate"
                    exit="initial"
                    className="rounded-full absolute -top-2 left-3 w-5 h-5 flex justify-center items-center bg-yellow-300"
                  >
                    <p className="text-gray-900"> {qty}</p>
                  </motion.div>
                ) : (
                  ""
                )}
              </AnimatePresence>
            </div>
          </Link>
          {!user ? (
            <Link href="/users/sign-in">
              <div className="hover:text-gray-50 transition-all">
                <UserCircleIcon className="inline w-6 h-6 mr-1" />
                Sign in
              </div>
            </Link>
          ) : (
            <div
              onClick={handleSignOut}
              className="cursor-pointer hover:text-gray-50 transition-all"
            >
              <UserCircleIcon className="inline w-6 h-6 mr-1" />
              Sign out
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
