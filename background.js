// background script file to run the event listener

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.executeScript(null, { file: "copyClass.js" });
});
