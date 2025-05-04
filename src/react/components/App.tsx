import { FC, useState } from "react";
import ImgDropzone from "./ImgDropzone/ImgDropzone";
import Form from "./Form/Form";
import CryptoJS from "crypto-js";
import embedLSB from "../../utils/embedLSB";
import textToBinary from "../../utils/textToBinary";
import BtnEncryptedImg from "./BtnEncryptedImg/BtnEncryptedImg";
import decryptImg from "../../utils/decryptImg";

const App: FC = () => {
  const [img, setImg] = useState<Blob>();
  const [processedImage, setProcessedImage] = useState<Blob>();
  const [keyState, setKeyState] = useState("");

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

  const downloadEncryptedImg = () => {
    if (!processedImage) {
      alert("No processed image to download");
      return;
    }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(processedImage);
    a.download = (img as File).name;
    a.click();
  };

  const handleDecryption = async () => {
    if (!img) {
      alert("Please select an image");
      return;
    }
    const decryptedPassword = await decryptImg(img, keyState);
    alert(decryptedPassword);
  };

  return (
    <main>
      <h1>Image Password</h1>
      <ImgDropzone img={img} setImg={setImg} />
      <BtnEncryptedImg
        downloadEncryptedImg={downloadEncryptedImg}
        isImgProcessed={Boolean(processedImage)}
      />
      <Form
        onSubmit={encryptPassword}
        setKeyState={setKeyState}
        decryptImg={handleDecryption}
      />
    </main>
  );
};

export default App;
