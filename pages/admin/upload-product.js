import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  auth,
  userData,
  uploadProduct,
  uploadProductImages,
} from "../../utils/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import FormSubmissionError from "../../components/shared/FormSubmissionError";
import FormInput from "../../components/shared/FormInput";
import FormTextArea from "../../components/shared/FormTextArea";
import FormInputFile from "../../components/shared/FormInputFile";
import FormSubmissionSpinner from "../../components/shared/FormSubmissionSpinner";

const UploadProduct = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      userData(user.uid).then((userData) => {
        setIsAdmin(userData.isAdmin);
      });
    }
  }, [user]);

  const formik = useFormik({
    initialValues: {
      images: [],
      name: "",
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
    onSubmit: async (
      { images, name, description, price, stockCount },
      { resetForm }
    ) => {
      // Save product images in firebase cloud storage & then save the product in cloud firestore
      uploadProductImages(images, setLoading, setError, setSuccess).then(
        (imageUrls) => {
          uploadProduct(
            router,
            resetForm,
            name,
            description,
            price,
            stockCount,
            imageUrls,
            setLoading,
            setError,
            setSuccess
          );
        }
      );
    },
  });

  return (
    <div className="w-11/12 md:w-3/5 xl:w-2/5 m-auto my-24">
      {!isAdmin ? (
        <p className="text-center">Only admins have access to this page.</p>
      ) : (
        <>
          <h1 className="font-bold text-3xl text-gray-900 text-center mb-6">
            Upload product
          </h1>
          <FormSubmissionError error={error} />
          <form className="flex flex-col" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col mx-8 my-8">
              <FormInputFile formik={formik} />
              <FormInput
                formik={formik}
                label="Name"
                field="name"
                type="text"
              />
              <FormTextArea formik={formik} />
              <FormInput
                formik={formik}
                label="Price"
                field="price"
                type="number"
              />
              <FormInput
                formik={formik}
                label="Stock count"
                field="stockCount"
                type="number"
              />
              <button
                type="submit"
                disabled={loading}
                className={`rounded w-full px-2 py-2 ${
                  success === true
                    ? "bg-green-600 text-green-50"
                    : "bg-blue-600 text-blue-50"
                }  hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? (
                  <FormSubmissionSpinner text="Uploading..." />
                ) : success ? (
                  "Uploaded"
                ) : (
                  "Upload"
                )}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default UploadProduct;
