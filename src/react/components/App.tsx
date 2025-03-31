import { FC, useState } from "react";
import ImgDropzone from "./ImgDropzone/ImgDropzone";
import Form from "./Form/Form";
import CryptoJS from "crypto-js";
import embedLSB from "../../utils/embedLSB";
import textToBinary from "../../utils/textToBinary";
import extractLSB from "../../utils/extractLSB";
import binaryToText from "../../utils/binaryToText";
import BtnEncryptedImg from "./BtnEncryptedImg/BtnEncryptedImg";

const App: FC = () => {
  const [img, setImg] = useState<Blob>();
  const [processedImage, setProcessedImage] = useState<Blob>();

  const processImage = async (encryptedPassword: string) => {
    if (!img) {
      alert("Please select an image");
      return;
    }
    const binaryPassword = textToBinary(encryptedPassword);
    const processedImage = await embedLSB(img, binaryPassword);
    setProcessedImage(processedImage);
  };

  const encryptPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const key = formData.get("key");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!key || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    const encryptedPassword = CryptoJS.AES.encrypt(
      password.toString(),
      key.toString(),
    );
    processImage(encryptedPassword.toString());
  };

  const testDecryptPassword = async (key = "test") => {
    if (!processedImage) {
      console.log("No processed image to decrypt");
      return;
    }
    // Convert the processed image to binary data
    const binaryData = await extractLSB(processedImage);
    // Convert binary to string
    const encryptedString = binaryToText(binaryData);
    // Decrypt the string
    const decryptedPassword = CryptoJS.AES.decrypt(encryptedString, key);
    const decryptedPasswordString = decryptedPassword.toString(
      CryptoJS.enc.Utf8,
    );
    console.log("Decrypted password:", decryptedPasswordString);
  };

  return (
    <main>
      <h1>Image Password</h1>
      <ImgDropzone img={img} setImg={setImg} />
      <BtnEncryptedImg
        onClickEncryptedImg={() => {}}
        isImgProcessed={Boolean(processedImage)}
      />
      <Form onSubmit={encryptPassword} />
      {processedImage && (
        <img src={URL.createObjectURL(processedImage)} alt="processed" />
      )}
      <button onClick={() => testDecryptPassword()}>
        test decrypt password
      </button>
    </main>
  );
};

export default App;
