import React, { useState } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import { addReview } from "../../../utils/firebase.config";
import ErrorFormSubmission from "../FormSubmissionError";
import FormInput from "../FormInput";
import FormInputSelect from "../FormInputSelect";
import FormInputComment from "../FormInputComment";
import Spinner from "../Spinner";

const formVariant = {
  initial: {
    opacity: 0,
    y: "-0.5rem",
  },
  animate: {
    opacity: 1,
    y: "0rem",
  },
  exit: {
    opacity: 0,
    y: "-0.5rem",
  },
};

const errorVariant = {
  initial: {
    opacity: 0,
    x: "-0.1rem",
  },
  animate: {
    opacity: 1,
    x: "0rem",
  },
  exit: {
    opacity: 0,
    x: "-0.1rem",
  },
};

const ProductReviewForm = ({ userId, productId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      rating: "",
      review: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "Must be less than 20 characters")
        .required("Required"),
      rating: Yup.string()
        .oneOf(["1", "2", "3", "4", "5"])
        .required("Required."),
      review: Yup.string().required("Required."),
    }),
    onSubmit: ({ name, rating, review }) => {
      addReview(productId, userId, name, rating, review, setLoading, setError);
      router.push("/");
    },
  });

  return (
    <>
      <AnimatePresence>
        <motion.div
          variants={formVariant}
          initial="initial"
          animate="animate"
          exit="initial"
          className="product-review-form mb-12"
        >
          <form
            className="w-11/12 md:w-3/5 xl:w-2/5 flex flex-col"
            onSubmit={formik.handleSubmit}
          >
            <ErrorFormSubmission error={error} setError={setError} />
            <div className="flex flex-col relative">
              <FormInput
                formik={formik}
                label="Name"
                field="name"
                type="text"
              />
              <FormInputSelect formik={formik} />
              <FormInputComment formik={formik} />
            </div>
            <button
              disabled={loading}
              className="bg-blue-600 text-blue-50 px-2 py-1 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
            >
              {loading ? <Spinner type="Submitting..." /> : "Submit"}
            </button>
          </form>
        </motion.div>
      </AnimatePresence>
    </>
  );
};
export default ProductReviewForm;
