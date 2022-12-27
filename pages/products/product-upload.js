import React, { useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase.config";
import { v4 as uuidv4 } from "uuid";
import SuccessFormSubmission from "../../components/shared/SuccessFormSubmission";
import ErrorFormSubmission from "../../components/shared/ErrorFormSubmission";
import Spinner from "../../components/shared/Spinner";
import FormInput from "../../components/shared/FormInput";
import FormInputDesc from "../../components/shared/FormInputDesc";
import FormInputImage from "../../components/shared/FormInputImage";

const ProductUpload = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      // const storeImage = async (image) => {
      //   return new Promise((resolve, reject) => {
      //     const fileName = `${image.name}-${uuidv4()}`;

      //     const storageRef = ref(storage, "images/" + fileName);

      //     const uploadTask = uploadBytesResumable(storageRef, image);

      //     uploadTask.on(
      //       "state_changed",
      //       (snapshot) => {
      //         const progress =
      //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //         console.log("Upload is " + progress + "% done");
      //         switch (snapshot.state) {
      //           case "paused":
      //             console.log("Upload is paused");
      //             break;
      //           case "running":
      //             console.log("Upload is running");
      //             break;
      //         }
      //       },
      //       (error) => {
      //         reject(error);
      //       },
      //       () => {
      //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      //           resolve(downloadURL);
      //         });
      //       }
      //     );
      //   });
      // };

      // const imgUrls = await Promise.all(
      //   [...images].map((image) => {
      //     console.log(image);
      //     storeImage(image);
      //   })
      // ).catch((error) => {
      //   setLoading(false);
      //   setError(error.message);
      // });

      // console.log(imgUrls);
    },
  });
  return (
    <div className="w-11/12 md:w-3/5 xl:w-1/3 m-auto my-24">
      <h1 className="font-bold text-3xl text-gray-800 text-center mb-6">
        Create & upload product
      </h1>
      <SuccessFormSubmission success={success} setSuccess={setSuccess} />
      <ErrorFormSubmission error={error} setError={setError} />
      <form
        className="shadow-md border rounded-xl flex flex-col"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col mx-8 my-8">
          <FormInputImage formik={formik} />
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
            label="Stock count"
            field="stockCount"
            type="number"
          />
          <button
            type="submit"
            disabled={loading}
            className="shadow rounded w-36 py-2 bg-blue-600 text-blue-50 px-2 py-1 hover:bg-blue-700 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Spinner type="Uploading..." /> : "Upload"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default ProductUpload;
