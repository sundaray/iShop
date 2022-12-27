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

const FormInputImages = ({ formik }) => {
  return (
    <div className="flex flex-col mb-6 relative">
      <input
        className={`rounded peer appearance-none bg-white border py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-transparent`}
        placeholder="Images"
        id="images"
        name="images"
        type="file"
        accept=".png, .jpeg, .jpg"
        onChange={(event) => {
          formik.setFieldValue("images", Array.from(event.target.images));
        }}
        multiple
      />
      <label
        className="absolute transition-all left-2 -top-2.5 bg-white text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-gray-600 peer-focus:text-sm peer-focus:bg-white"
        htmlFor="images"
      >
        Images
      </label>
      <AnimatePresence>
        {formik.touched.images && formik.errors.images ? (
          <motion.span
            variants={errorVariant}
            initial="initial"
            animate="animate"
            exit="initial"
            className="mt-1 text-red-500 text-xs"
          >
            {formik.errors.images}
          </motion.span>
        ) : (
          ""
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormInputImages;
