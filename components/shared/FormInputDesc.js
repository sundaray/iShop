import React, { useState } from "react";
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

const FormInputDesc = ({ formik }) => {
  const [eye, setEye] = useState(true);

  return (
    <div className="flex flex-col mb-6 relative">
      <textarea
        className={`rounded peer appearance-none bg-white border ${
          formik.touched.password && formik.errors.password
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-blue-500"
        } py-2 px-3 text-gray-700 leading-tight focus:outline-none placeholder-transparent`}
        placeholder="Description"
        id="description"
        name="description"
        rows="6"
        {...formik.getFieldProps("description")}
      />
      <label
        className="absolute transition-all left-2 -top-2.5 bg-white text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-gray-600 peer-focus:text-sm peer-focus:bg-white"
        htmlFor="description"
      >
        Description
      </label>
      <AnimatePresence>
        {formik.touched.description && formik.errors.description ? (
          <motion.span
            variants={errorVariant}
            initial="initial"
            animate="animate"
            exit="initial"
            className="mt-1 text-red-500 text-xs"
          >
            {formik.errors.description}
          </motion.span>
        ) : (
          ""
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormInputDesc;
