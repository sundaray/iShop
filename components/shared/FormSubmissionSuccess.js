import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const successVariant = {
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

const FormSubmissionSuccess = ({ success }) => {
  return (
    <AnimatePresence>
      {success ? (
        <motion.p
          variants={successVariant}
          initial="initial"
          animate="animate"
          className="ml-8 text-green-500"
        >
          {success}
        </motion.p>
      ) : (
        ""
      )}
    </AnimatePresence>
  );
};

export default FormSubmissionSuccess;
