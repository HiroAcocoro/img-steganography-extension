import { FC } from "react";

const testFunction = async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const [activeTab] = tabs;

  chrome.tabs.sendMessage(activeTab.id || 0, "Hello world");
};

const App: FC = () => {
  return (
    <main>
      <h1>test</h1>
      <button onClick={testFunction}>Test Btn</button>
    </main>
  );
};

export default App;
