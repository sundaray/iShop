import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../utils/firebase.config";
import ErrorFormSubmission from "../../components/shared/ErrorFormSubmission";
import SuccessFormSubmission from "../../components/shared/SuccessFormSubmission";
import FormInput from "../../components/shared/FormInput";
import Spinner from "../../components/shared/Spinner";

const ResetPassword = () => {
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
    <div className="w-11/12 md:w-3/5 xl:w-1/3 mt-20 m-auto">
      <h1 className="font-bold text-3xl text-gray-800 text-center mb-6">Reset your password</h1>
      <SuccessFormSubmission success={success} setSuccess={setSuccess} />
      <ErrorFormSubmission error={error} setError={setError} />
      <form
        className="shadow flex flex-col rounded-xl"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col">
          <div className="mx-8 mt-8">
            <div className="mb-8">
            <FormInput
              formik={formik}
              label="Email"
              field="email"
              type="email"
            />
              <button
                type="submit"
                disabled={loading}
                className="w-full shadow rounded sign-up w-50 bg-blue-600 text-blue-50 px-2 py-1 hover:bg-blue-700 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <Spinner type="Resetting... password" />
                ) : (
                  "Reset password"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ResetPassword;
