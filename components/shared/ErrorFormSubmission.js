import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const errorVariant = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: "-0.3rem",
  },
  animate: {
    opacity: 1,
    scale: 1,
    x: "0rem",
    transition: { ease: "easeOut", duration: 0.2 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: "-0.3rem",
  },
};

const ErrorFormSubmission = ({ error, setError }) => {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          variants={errorVariant}
          initial="initial"
          animate="animate"
          exit="initial"
          className="absolute top-6 m-auto right-0 left-0 flex justify-between items-center bg-red-500 w-11/12  md:w-3/5 xl:w-1/3 h-10 mb-4  shadow-sm rounded px-4 py-2"
        >
          <p className="text-center text-white">{error}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 text-white hover:scale-110 cursor-pointer transition-all"
            onClick={() => setError(null)}
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clip-rule="evenodd"
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorFormSubmission;
