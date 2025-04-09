import extractLSB from "./extractLSB";
import binaryToText from "./binaryToText";
import CryptoJS from "crypto-js";

const decryptImg = async (
  img: Blob | undefined,
  key: string,
): Promise<string> => {
  if (!img) {
    alert("No image to decrypt");
    return "";
  }
  // Convert the processed image to binary data
  const binaryData = await extractLSB(img);
  // Convert binary to string
  const encryptedString = binaryToText(binaryData);
  // Decrypt the string
  const decryptedPassword = CryptoJS.AES.decrypt(encryptedString, key);
  const decryptedPasswordString = decryptedPassword.toString(CryptoJS.enc.Utf8);
  return decryptedPasswordString;
};

export default decryptImg;
