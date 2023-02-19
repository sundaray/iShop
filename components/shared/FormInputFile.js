import React from "react";

const FormInputFile = ({ formik }) => {
  return (
    <div className="flex flex-col mb-6 relative">
      <input
        className={`rounded peer appearance-none bg-gray-50 border py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-transparent`}
        placeholder="Images"
        id="images"
        name="images"
        type="file"
        accept=".png, .jpeg, .jpg"
        onChange={(event) => {
          formik.setFieldValue("images", Array.from(event.target.files));
        }}
        multiple
      />
      <label
        className="absolute transition-all left-2 -top-2.5 bg-gray-50 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-gray-600 peer-focus:text-sm peer-focus:bg-gray-50"
        htmlFor="images"
      >
        Images
      </label>
    </div>
  );
};

export default FormInputFile;
