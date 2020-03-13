chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ fees: { ebay: 0.0684, paypal: 0.0342 } });
});
