chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ generatedAt: Date.now() });
  console.log("Generated extension installed");
});