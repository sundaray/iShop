import React from "react";

const Spinner = ({ type }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="loader mr-2"></div>
      <p>{type}</p>
    </div>
  );
};

export default Spinner;
