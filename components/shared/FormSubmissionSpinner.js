import React from "react";

const FormSubmissionSpinner = ({ text }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="loader mr-2"></div>
      <p>{text}</p>
    </div>
  );
};

export default FormSubmissionSpinner;
