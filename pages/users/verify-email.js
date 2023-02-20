import React from "react";
import Link from "next/link";

const VerifyEmail = () => {
  return (
    <>
      <div className="w-11/12 md:w-3/5 xl:w-2/5 flex flex-col mt-24 m-auto py-8 px-4">
        <h1 className="font-bold text-gray-900 text-3xl text-center mb-6">
          Verify your email
        </h1>
        <p className="mb-4">
          We have sent an email verification link to your email address. Click
          on the link to verify your email.
        </p>
        <p className="mb-4">
          If you do not receive the link in your inbox, it is possible that it
          ended up in your spam folder. So make sure to check there as well.
        </p>
        <Link href="/users/sign-in">
          <button className="px-2 py-1 rounded border border-gray-400 hover:shadow">
            Sign in
          </button>
        </Link>
      </div>
    </>
  );
};
export default VerifyEmail;
