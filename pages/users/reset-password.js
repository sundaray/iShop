import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormSubmissionError from "../../components/shared/FormSubmissionError";
import FormSubmissionSuccess from "../../components/shared/FormSubmissionSuccess";
import FormInput from "../../components/shared/FormInput";
import FormSubmissionSpinner from "../../components/shared/FormSubmissionSpinner";
import { resetPassword } from "../../utils/firebase.config";

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
    onSubmit: ({ email }) => {
      resetPassword(email, setLoading, setError, setSuccess);
    },
  });
  return (
    <div className="w-11/12 md:w-3/5 xl:w-1/3 mt-24 m-auto">
      <h1 className="font-bold text-3xl text-gray-800 text-center mb-6">
        Reset your password
      </h1>
      <FormSubmissionSuccess success={success} />
      <FormSubmissionError error={error} />
      <form className="flex flex-col" onSubmit={formik.handleSubmit}>
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
                disabled={loading || !formik.isValid}
                className="w-full rounded sign-up w-50 bg-blue-600 text-blue-50 px-2 py-1 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <FormSubmissionSpinner text="Resetting... password" />
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
