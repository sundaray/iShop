import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../../utils/firebase.config";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  updateProfile,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import SuccessFormSubmission from "../../components/shared/SuccessFormSubmission";
import ErrorFormSubmission from "../../components/shared/ErrorFormSubmission";
import Spinner from "../../components/shared/Spinner";
import FormInput from "../../components/shared/FormInput";
import FormInputPassword from "../../components/shared/FormInputPassword";

const SignUp = () => {
  const [success, setSuccess] = useState(null);
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
    onSubmit: async ({ username, email, password }) => {
      try {
        setLoading(true);
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await sendEmailVerification(auth.currentUser).then(async () => {
          setLoading(false);
          router.push("/users/verify-email");
          await updateProfile(auth.currentUser, {
            displayName: username,
          });
        });
      } catch (error) {
        setLoading(false);
        if (error.code === "auth/email-already-in-use") {
          setError("User already registered");
        }
      }
    },
  });
  return (
    <div className="w-11/12 md:w-3/5 xl:w-1/3 mt-20 m-auto">
      <h1 className="font-bold text-3xl text-gray-800 text-center mb-6">Sign up for an account</h1>
      <SuccessFormSubmission success={success} setSuccess={setSuccess} />
      <ErrorFormSubmission error={error} setError={setError} />
      <form
        className="shadow border rounded-xl flex flex-col"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col">
          <div className="mx-8 mt-12">
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
                disabled={loading}
                className="shadow rounded w-full py-2 bg-blue-600 text-blue-50 px-2 py-1 hover:bg-blue-700 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Spinner type="Signing... up" /> : "Sign up"}
              </button>
            </div>
          </div>
          <div className="bg-gray-100 rounded-b-xl w-full h-20 px-8 flex justify-center items-center">
            <Link href="/users/sign-in">
              <p className="text-sm text-gray-700 font-medium ">
                Already a user?{" "}
                <span className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline cursor-pointer transition-all">
                  Sign in
                </span>
              </p>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
