import { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ImgDropzone: FC = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    alert(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default ImgDropzone;
