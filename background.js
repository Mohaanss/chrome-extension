chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("heee");
  if (request.type === "showNotification") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "apple-icon-57x57.png",
      title: "Notification",
      message: "Vous avez cliqué sur le bouton!",
      priority: 2,
    });
  }
});
