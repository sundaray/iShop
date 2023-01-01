import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircleIcon } from "@heroicons/react/24/outline";

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

const PageError = ({ error, setError }) => {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          variants={errorVariant}
          initial="initial"
          animate="animate"
          exit="initial"
          className="z-20 absolute top-24 m-auto right-0 left-0 flex justify-between items-center bg-red-200 w-11/12  md:w-3/5 xl:w-1/5 h-10 mb-4 rounded px-4 py-2"
        >
          <p className="text-center text-red-600">{error}</p>
          <XCircleIcon
            onClick={() => setError(null)}
            className="w-5 h-5 text-gray-900 hover:scale-110 cursor-pointer transition-all"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageError;
