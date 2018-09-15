export default (key, data) => {
  chrome.storage.local.set({
    [key]: JSON.stringify(data)
  });
}
