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

const SuccessFormSubmission = ({ success, setSuccess }) => {
  return (
    <AnimatePresence>
      {success && (
        <motion.div
          variants={errorVariant}
          initial="initial"
          animate="animate"
          exit="initial"
          className="absolute top-5 m-auto right-0 left-0 flex justify-between items-center bg-green-500 w-11/12  md:w-3/5 xl:w-1/3 h-10 mb-4 shadow-sm rounded px-3 py-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-left text-green-50">{success}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessFormSubmission;
