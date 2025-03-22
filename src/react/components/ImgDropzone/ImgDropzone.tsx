import { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./ImgDropzone.css";

const ImgDropzone: FC = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    alert(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
  });

  return (
    <section className="dropzone-container">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  );
};

export default ImgDropzone;
