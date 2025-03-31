import { FC } from "react";
import "./BtnEncryptedImg.css";

type BtnEncryptedImgProps = {
  isImgProcessed: boolean;
  onClickEncryptedImg: () => void;
};

const BtnEncryptedImg: FC<BtnEncryptedImgProps> = ({
  isImgProcessed,
  onClickEncryptedImg,
}) => {
  if (!isImgProcessed) return null;

  return (
    <div className="img-decrypted-container">
      <button className="img-decrypted" onClick={onClickEncryptedImg}>
        <span className="material-symbols-outlined">image</span>
        Encrypted image
      </button>
    </div>
  );
};

export default BtnEncryptedImg;
