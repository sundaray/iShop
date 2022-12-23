import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase.config";
import ErrorFormSubmission from "../../components/shared/ErrorFormSubmission";
import InputEmail from "../../components/shared/InputEmail";
import InputPassword from "../../components/shared/InputPassword";
import SignInWithGoogle from "../../components/shared/SignInWithGoogle";
import Spinner from "../../components/shared/Spinner";

const SignIn = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(5, "Must be 5 characters or more")
        .required("Password is required"),
    }),
    onSubmit: async ({ email, password }) => {
      try {
        setLoading(true);
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (user.emailVerified) {
          setError(null);
          setLoading(false);
          localStorage.setItem("displayName", user.displayName);
          router.replace(
            router.query.from ? decodeURIComponent(router.query.from) : "/"
          );
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setError(error.message);
        if (error.code === "auth/user-not-found") {
          setError("User not found");
        } else if (error.code === "auth/wrong-password") {
          setError("Invalid password");
        } else if (error.code === "auth/network-request-failed") {
          setError("Network Error");
        }
      }
    },
  });
  return (
    <>
      <ErrorFormSubmission error={error} setError={setError} />
      <form
        className="relative shadow-md w-11/12 md:w-3/5 xl:w-2/5 flex flex-col rounded-xl mt-20 m-auto"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col">
          <div className="mx-8 mt-8">
            <InputEmail formik={formik} />
            <InputPassword formik={formik} />
            <div className="flex justify-between items-center mb-6">
              <button
                type="submit"
                disabled={loading}
                className="w-36 rounded bg-blue-600 text-white px-2 py-1 hover:bg-blue-700 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Spinner type="Signing... in" /> : "Sign in"}
              </button>
              <Link href="/users/forgot-password">
                <p className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-all">
                  Forgot password
                </p>
              </Link>
            </div>
          </div>
          <div className="rounded-b-xl bg-gray-100 w-full h-24 px-8 flex flex-col md:flex-row justify-evenly md:justify-center items-center">
            <SignInWithGoogle />
          </div>
        </div>
        <div className="absolute -bottom-8 left-0">
          <Link href="/users/sign-up">
            <p className="text-sm text-gray-700 font-medium ">
              New user?{" "}
              <span className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline cursor-pointer transition-all">
                Sign up
              </span>
            </p>
          </Link>
        </div>
      </form>
    </>
  );
};
export default SignIn;
