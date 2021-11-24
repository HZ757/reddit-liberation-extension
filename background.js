chrome.runtime.onInstalled.addListener((reason) => {
    if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
      chrome.tabs.create({
        url: 'options.html'
      });
    }
});

chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({
        url: 'options.html'
    });
});