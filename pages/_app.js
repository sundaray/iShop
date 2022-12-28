import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase.config";
import Navigation from "../components/shared/navigation/Navigation";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("displayName");
    setUser(null);
    signOut(auth).then(() => {
      router.push("/");
    });
  };

  useEffect(() => {
    setUser(localStorage.getItem("displayName") || null);
  }, []);

  return (
    <>
      <Navigation user={user} handleSignOut={handleSignOut} />
      <Component {...pageProps} />
    </>
  );
}
