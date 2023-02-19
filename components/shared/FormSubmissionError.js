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

const FormSubmissionError = ({ error }) => {
  return (
    <AnimatePresence>
      {error ? (
        <motion.p
          variants={errorVariant}
          initial="initial"
          animate="animate"
          className="ml-8 text-red-500"
        >
          {error}
        </motion.p>
      ) : (
        ""
      )}
    </AnimatePresence>
  );
};

export default FormSubmissionError;
