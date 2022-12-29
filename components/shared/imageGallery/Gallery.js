import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Gallery = ({ imgUrls }) => {
  const [index, setIndex] = useState(0);

  console.log(imgUrls)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % imgUrls.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [imgUrls]);

  const handlePrevClick = () => {
    setIndex((i) => (i + imgUrls.length - 1) % imgUrls.length);
  };

  const handleNextClick = () => {
    setIndex((i) => (i + 1) % imgUrls.length);
  };

  return (
    <div>
      <AnimatePresence>
        <motion.img
          src={imgUrls[index]}
          key={index}
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "-100%" }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>
      <button onClick={handlePrevClick}>Previous</button>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};

export default Gallery;
