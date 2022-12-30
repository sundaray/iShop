import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import googleLogo from "../../public/googleLogo.svg";
import { signInWithGooglePopup } from "../../utils/firebase.config";

const SignInWithGoogle = () => {
  const router = useRouter();

  console.log(router)

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    if(user) {
      router.replace(
        router.query.from ? decodeURIComponent(router.query.from) : "/"
      );
    }
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
