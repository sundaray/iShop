import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "../../utils/firebase.config";
import FormSubmissionError from "../../components/shared/FormSubmissionError";
import FormInput from "../../components/shared/FormInput";
import FormInputPassword from "../../components/shared/FormInputPassword";
import SignInWithGoogle from "../../components/shared/SignInWithGoogle";
import FormSubmissionSpinner from "../../components/shared/FormSubmissionSpinner";

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
    onSubmit: ({ email, password }) => {
      signIn(router, email, password, setLoading, setError);
    },
  });
  return (
    <div className="w-11/12 md:w-3/5 xl:w-1/3 mt-24 m-auto">
      <h1 className="font-bold text-3xl text-gray-900 text-center">Sign in</h1>
      <Link href="/users/sign-up">
        <p className="text-sm text-gray-600 text-center font-medium mb-6">
          New user?{" "}
          <span className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline cursor-pointer transition-all">
            Sign up
          </span>
        </p>
      </Link>
      <FormSubmissionError error={error} />
      <form
        className="relative flex flex-col m-auto"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col">
          <div className="mx-8 mt-6">
            <FormInput
              formik={formik}
              label="Email"
              field="email"
              type="email"
            />
            <FormInputPassword formik={formik} />
            <Link href="/users/reset-password">
              <p className="text-sm font-medium text-right mb-6 text-blue-600 hover:text-blue-700 hover:underline transition-all">
                Forgot your password?
              </p>
            </Link>
            <button
              type="submit"
              disabled={loading || !formik.isValid}
              className="w-full rounded mb-6 bg-blue-600 text-blue-50 px-2 py-1 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <FormSubmissionSpinner text="Signing... in" />
              ) : (
                "Sign in"
              )}
            </button>
            <div className="flex items-center mb-6">
              <div className="w-full h-px bg-gray-300"></div>
              <p className="mx-1 text-gray-400">Or</p>
              <div className="w-full h-px bg-gray-300"></div>
            </div>
            <SignInWithGoogle />
          </div>
        </div>
      </form>
    </div>
  );
};
export default SignIn;
