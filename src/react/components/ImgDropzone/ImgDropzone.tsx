import { Dispatch, FC, SetStateAction, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./ImgDropzone.css";

type ImgDropzoneProps = {
  img: Blob | undefined;
  setImg: Dispatch<SetStateAction<Blob | undefined>>;
};

const ImgDropzone: FC<ImgDropzoneProps> = ({ img, setImg, decryptImg }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImg(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
  });

  if (img) {
    return (
      <section className="img-container">
        <img src={URL.createObjectURL(img)} alt={URL.createObjectURL(img)} />
      </section>
    );
  }

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
