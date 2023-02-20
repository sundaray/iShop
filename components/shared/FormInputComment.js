import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const FormInputComment = ({ formik }) => {
  return (
    <div className="flex flex-col mb-6 relative">
      <textarea
        className={`rounded peer shadow-sm appearance-none bg-gray-50 border ${
          formik.touched.review && formik.errors.review
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-blue-500"
        } py-2 px-3 text-gray-700 leading-tight focus:outline-none placeholder-transparent`}
        placeholder="Review"
        id="review"
        name="review"
        rows="6"
        {...formik.getFieldProps("review")}
      />
      <label
        className="absolute transition-all left-2 -top-2.5 bg-gray-50 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-gray-600 peer-focus:text-sm peer-focus:bg-gray-50"
        htmlFor="review"
      >
        Review
      </label>
      <AnimatePresence>
        {formik.touched.review && formik.errors.review ? (
          <motion.span
            variants={errorVariant}
            initial="initial"
            animate="animate"
            exit="initial"
            className="mt-1 text-red-500 text-xs"
          >
            {formik.errors.review}
          </motion.span>
        ) : (
          ""
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormInputComment;
