import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../utils/firebase.config";
import PageSpinner from "../PageSpinner";

const withPrivate = (Component) => {
  const WithPrivateComponent = (props) => {
    const router = useRouter();
    const [user, loading] = useAuthState(auth);

    const loginPath = `/users/sign-in?from=${encodeURIComponent(
      router.asPath
    )}`;

    if (loading) {
      return (
        <div className="w-full h-screen flex justify-center items-center">
          <PageSpinner />
        </div>
      );
    }
    if (!loading && !user) {
      router.push(loginPath);
    }

    return <Component {...props} />;
  };

  WithPrivateComponent.displayName = "WithPrivateComponent";

  return WithPrivateComponent;
};

export default withPrivate;