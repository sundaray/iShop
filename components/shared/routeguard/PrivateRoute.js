import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../utils/firebase.config";
import Spinner from "../Spinner";

export default function PrivateRoute({ protectedRoutes, children }) {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  const loginPath = `/users/sign-in?from=${encodeURIComponent(router.asPath)}`;

  useEffect(() => {
    if (!loading && !user && pathIsProtected) {
      router.push(loginPath);
    }
  }, [loading, user, pathIsProtected, loginPath, router]);

  if ((loading || !user) && pathIsProtected) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return children;
}
