import React from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase.config";

const SignInWithGoogle = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    localStorage.setItem("displayName", user.displayName);
    localStorage.setItem("emailVerified", true);
    await createUserDocumentFromAuth(user);
    navigate(location.state ? location.state.from.pathname : "/");
  };

  return (
    <div
      className="w-fit bg-blue-500 hover:bg-blue-600 hover:shadow-md m-auto flex items-center justify-between cursor-pointer"
      onClick={logGoogleUser}
    >
      <img src="login.svg" alt="Google Sign In" className="w-10 h-10" />
      <div className="mr-1 text-white font-normal">Sign in with Google</div>
    </div>
  );
};

export default SignInWithGoogle;
