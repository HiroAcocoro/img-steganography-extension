import { FC } from "react";
import "./BtnEncryptedImg.css";

type BtnEncryptedImgProps = {
  isImgProcessed: boolean;
  downloadEncryptedImg: () => void;
};

const BtnEncryptedImg: FC<BtnEncryptedImgProps> = ({
  isImgProcessed,
  downloadEncryptedImg,
}) => {
  if (!isImgProcessed) return null;

  return (
    <div className="img-decrypted-container">
      <button className="img-decrypted" onClick={downloadEncryptedImg}>
        <span className="material-symbols-outlined">image</span>
        Encrypted image
      </button>
    </div>
  );
};

export default BtnEncryptedImg;
