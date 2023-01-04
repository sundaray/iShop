import React from "react";
import Link from "next/link";
import { your } from "./../../.next/static/chunks/amp";

const VerifyEmail = () => {
  return (
    <>
      <div className="shadow border rounded-xl w-11/12 md:w-3/5 xl:w-2/5 flex flex-col mt-24 m-auto py-8 px-4">
        <h1 className="font-black text-gray-900 text-3xl text-center mb-8">
          Verify Your Email
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
          <button className="rounded hover:shadow-md border hover:border-gray-400  bg-gray-100 px-2 py-1">
            Sign In
          </button>
        </Link>
      </div>
    </>
  );
};
export default VerifyEmail;
