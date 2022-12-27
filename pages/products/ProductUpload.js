import React from "react";
import { useFormik } from "formik";
import InputImage from "../../components/shared/InputImage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase.config";

const ProductUpload = () => {
  const formik = useFormik({
    initialValues: {
      images: [],
    },
    onSubmit: async ({ images }) => {
      const storeImage = async (image) => {
        return new Promise((resolve, reject) => {
          const storageRef = ref(storage, "images/" + image);

          const uploadTask = uploadBytesResumable(storageRef, image);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
              }
            },
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
          );
        });
      };

      const imageUrls = await Promise.all(
        images.map(async (image) => {
          console.log(image);
          return await storeImage(image);
        })
      ).catch((error) => {
        setLoading(false);
        setError(error.message);
      });

      console.log(imageUrls);
    },
  });
  return (
    <div className="w-11/12 md:w-3/5 xl:w-1/3 m-auto my-24">
      <form
        className="shadow-md border rounded-xl flex flex-col"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col mx-8 my-8">
          <InputImage formik={formik} />
          <button
            type="submit"
            className="shadow rounded w-36 px-2 py-2 bg-blue-600 text-blue-50"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};
export default ProductUpload;
