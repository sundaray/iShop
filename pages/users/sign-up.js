import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import SuccessFormSubmission from "../../components/shared/SuccessFormSubmission";
import FormSubmissionError from "../../components/shared/FormSubmissionError";
import FormInput from "../../components/shared/FormInput";
import FormInputPassword from "../../components/shared/FormInputPassword";
import FormSubmissionSpinner from "../../components/shared/FormSubmissionSpinner";
import { signUp } from "../../utils/firebase.config";

const SignUp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(10, "Must be less than 10 characters")
        .required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(5, "Must be 5 characters or more")
        .required("Password is required"),
    }),
    onSubmit: ({ username, email, password }) => {
      signUp(router, username, email, password, setLoading, setError);
    },
  });
  return (
    <div className="w-11/12 md:w-3/5 xl:w-1/3 mt-24 m-auto">
      <h1 className="font-bold text-3xl text-gray-900 text-center">Sign up</h1>
      <Link href="/users/sign-in">
        <p className="mb-6 text-sm text-gray-600 text-center font-medium ">
          Already a user?{" "}
          <span className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline cursor-pointer transition-all">
            Sign in
          </span>
        </p>
      </Link>
      <FormSubmissionError error={error} />
      <form className="flex flex-col" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col">
          <div className="mx-8 mt-6">
            <FormInput
              formik={formik}
              label="Username"
              field="username"
              type="text"
            />
            <FormInput
              formik={formik}
              label="Email"
              field="email"
              type="email"
            />
            <FormInputPassword formik={formik} />
            <div className="flex justify-between items-center mb-8">
              <button
                type="submit"
                disabled={loading || !formik.isValid}
                className="rounded w-full bg-blue-600 text-blue-50 px-2 py-1 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <FormSubmissionSpinner text="Signing... up" />
                ) : (
                  "Sign up"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
