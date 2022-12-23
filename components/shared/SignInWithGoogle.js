import React from "react";
import Image from "next/image";
import googleLogo from "../../public/googleLogo.svg";
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
      className="w-fit rounded shadow bg-white hover:shadow-md m-auto flex items-center justify-between cursor-pointer"
      onClick={logGoogleUser}
    >
      <Image src={googleLogo} alt="Google logo" className="w-10 h-10" />
      <div className="mr-3 text-gray-400  font-medium">Sign in with Google</div>
    </div>
  );
};

export default SignInWithGoogle;
