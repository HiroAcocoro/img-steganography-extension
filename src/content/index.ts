chrome.runtime?.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg) alert(msg);
});
