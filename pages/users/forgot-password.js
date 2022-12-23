import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase.config";
import ErrorFormSubmission from "../commonUi/ErrorFormSubmission";
import SuccessFormSubmission from "../commonUi/SuccessFormSubmission";
import Spinner from "../commonUi/Spinner";
import HomeButton from "../commonUi/HomeButton";
import InputEmail from "../commonUi/InputEmail";

const ForgotPassword = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async ({ email }) => {
      try {
        setLoading(true);
        await sendPasswordResetEmail(auth, email);
        setLoading(false);
        setError(null);
        setSuccess("Password reset email sent.");
      } catch (error) {
        setLoading(false);
        setSuccess(null);
        if (error.code === "auth/user-not-found") {
          setError("There is no user registered with that email address.");
        }
      }
    },
  });
  return (
    <>
      <HomeButton />
      <SuccessFormSubmission success={success} setSuccess={setSuccess} />
      <ErrorFormSubmission error={error} setError={setError} />
      <form
        className="shadow w-11/12 md:w-3/5 xl:w-2/5 flex flex-col rounded mt-20 m-auto"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col">
          <div className="mx-8 mt-8">
            <div className="mb-8">
              <InputEmail formik={formik} />
              <button
                type="submit"
                disabled={loading}
                className="sign-up w-60 bg-blue-500 text-white px-2 py-1 hover:bg-blue-600 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Spinner type="Sending... email" />
                ) : (
                  "Send password reset email"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default ForgotPassword;
