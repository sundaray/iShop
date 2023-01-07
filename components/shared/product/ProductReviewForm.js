import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInputComment from "../FormInputComment";
import ErrorFormSubmission from "../ErrorFormSubmission";
import { addReview } from "../../../utils/firebase.config";

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
  const [reviewError, setReviewError] = useState(null);

  const formik = useFormik({
    initialValues: {
      rating: "",
      review: "",
    },
    validationSchema: Yup.object({
      rating: Yup.string()
        .oneOf(["1", "2", "3", "4", "5"])
        .required("Required."),
      review: Yup.string().required("Required."),
    }),
    onSubmit: ({ rating, review }) => {
      addReview(productId, userId, rating, review);
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
          <ErrorFormSubmission error={reviewError} setError={setReviewError} />
          <form
            className="w-11/12 md:w-3/5 xl:w-2/5 flex flex-col"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col mb-6 relative">
              <select
                className="bg-gray-50 border rounded py-2 px-1 leading-tight focus:outline-none"
                name="rating"
                id="rating"
                {...formik.getFieldProps("rating")}
              >
                <option value="">Select a rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>

              <AnimatePresence>
                {formik.touched.rating && formik.errors.rating ? (
                  <motion.span
                    variants={errorVariant}
                    initial="initial"
                    animate="animate"
                    exit="initial"
                    className="text-red-500 text-xs mt-1"
                  >
                    {formik.errors.rating}
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </div>
            <FormInputComment formik={formik} />
            <button
              className="bg-blue-600 text-blue-50 px-2 py-1 rounded hover:bg-blue-700"
              type="submit"
            >
              Submit
            </button>
          </form>
        </motion.div>
      </AnimatePresence>
    </>
  );
};
export default ProductReviewForm;
