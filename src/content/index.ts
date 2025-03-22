chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  alert(msg);
});
