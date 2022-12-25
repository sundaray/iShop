import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../../utils/firebase.config";
import { useFormik } from "formik";
import * as Yup from "yup";
import SuccessFormSubmission from "../../components/shared/SuccessFormSubmission";
import ErrorFormSubmission from "../../components/shared/ErrorFormSubmission";
import Spinner from "../../components/shared/Spinner";
import FormInput from "../../components/shared/FormInput";
import FormInputDesc from "../../components/shared/FormInputDesc";

const Upload = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      description: "",
      price: "",
      stockCount: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, "Must be less than 50 characters")
        .required("Name is required"),
      description: Yup.string()
        .max(500, "Must be less than 500 characters")
        .required("Description is required"),
      price: Yup.string()
        .min(5, "Must be 5 characters or more")
        .required("Price is required"),
      stockCount: Yup.string()
        .min(5, "Must be 5 characters or more")
        .required("Password is required"),
    }),
    onSubmit: async ({ name, description, price, stockCount }) => {},
  });
  return (
    <>
      <SuccessFormSubmission success={success} setSuccess={setSuccess} />
      <ErrorFormSubmission error={error} setError={setError} />
      <form
        className="shadow-md border rounded-xl w-11/12 md:w-3/5 xl:w-2/5 flex flex-col mt-24 m-auto"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col">
          <div className="mx-8 my-12">
            <FormInput formik={formik} label="Name" field="name" type="text" />
            <FormInputDesc formik={formik} />
            <button
              type="submit"
              disabled={loading}
              className="shadow rounded w-40 bg-blue-600 text-white px-2 py-1 hover:bg-blue-700 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Spinner type="Uploading..." /> : "Upload"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default Upload;
