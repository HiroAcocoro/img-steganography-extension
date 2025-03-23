import { FC } from "react";
import ImgDropzone from "./ImgDropzone/ImgDropzone";
import Form from "./Form/Form";
import CryptoJS from "crypto-js";

const encryptPassword = (e: React.FormEvent<HTMLFormElement>) => {
  const formData = new FormData(e.target as HTMLFormElement);
  const key = formData.get("key");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  if (key && password && confirmPassword) { 
    const encryptedPassword = CryptoJS.AES.encrypt(password.toString(), key.toString());

    alert(encryptedPassword)
  }
}

const testFunction = async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const [activeTab] = tabs;

  chrome.tabs.sendMessage(activeTab.id || 0, "Hello world");
};

const App: FC = () => {
  return (
    <main>
      <h1>test</h1>
      <ImgDropzone />
      <Form onSubmit={encryptPassword} />
      <button onClick={testFunction}>Test Btn</button>
    </main>
  );
};

export default App;
