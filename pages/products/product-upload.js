import React, { useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import SuccessFormSubmission from "../../components/shared/SuccessFormSubmission";
import ErrorFormSubmission from "../../components/shared/ErrorFormSubmission";
import Spinner from "../../components/shared/Spinner";
import FormInput from "../../components/shared/FormInput";
import FormInputDesc from "../../components/shared/FormInputDesc";

const ProductUpload = () => {
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
      price: Yup.number()
        .positive("Price must be a positive number")
        .required("Price is required"),
      stockCount: Yup.number()
        .positive("Stock count must be a positive number")
        .integer("Stock count must be a whole number")
        .required("Stock count is required"),
    }),
    onSubmit: async ({ name, description, price, stockCount }) => {},
  });
  return (
    <>
      <SuccessFormSubmission success={success} setSuccess={setSuccess} />
      <ErrorFormSubmission error={error} setError={setError} />
      <form
        className="shadow-md border rounded-xl w-11/12 md:w-3/5 xl:w-2/5 flex flex-col my-24 m-auto"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col mx-8 my-8">
          <h1 className="font-bold text-3xl mb-6">Product</h1>
          <FormInput formik={formik} label="Name" field="name" type="text" />
          <FormInputDesc formik={formik} />
          <FormInput
            formik={formik}
            label="Price"
            field="price"
            type="number"
          />
          <FormInput
            formik={formik}
            label="Stock Count"
            field="stockCount"
            type="number"
          />
          <button
            type="submit"
            disabled={loading}
            className="shadow rounded w-full bg-blue-600 text-blue-50 px-2 py-1 hover:bg-blue-700 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Spinner type="Uploading..." /> : "Upload"}
          </button>
        </div>
      </form>
    </>
  );
};
export default ProductUpload;
