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

const InputUsername = ({ formik }) => {
  return (
    <div className="flex flex-col mb-6 relative">
      <input
        className="peer appearance-none bg-gray-50 border-2 border-gray-300 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-transparent"
        placeholder="Username"
        id="username"
        name="username"
        type="username"
        {...formik.getFieldProps("username")}
      />
      <label
        className="absolute transition-all left-2 -top-2.5 bg-gray-50 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-gray-600 peer-focus:text-sm peer-focus:bg-gray-50"
        htmlFor="username"
      >
        Username
      </label>
      <AnimatePresence>
        {formik.touched.username && formik.errors.username ? (
          <motion.span
            variants={errorVariant}
            initial="initial"
            animate="animate"
            exit="initial"
            className="mt-1 text-red-500 text-xs"
          >
            {formik.errors.username}
          </motion.span>
        ) : (
          ""
        )}
      </AnimatePresence>
    </div>
  );
};

export default InputUsername;
