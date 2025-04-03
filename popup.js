document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.getElementById("toggleRTL");

  // بارگذاری وضعیت ذخیره‌شده
  chrome.storage.sync.get(["rtlEnabled"], (result) => {
    const isEnabled = result.rtlEnabled || false;
    toggleSwitch.checked = isEnabled;
  });

  // وقتی سوئیچ تغییر کرد
  toggleSwitch.addEventListener("change", () => {
    const newState = toggleSwitch.checked;

    // ذخیره وضعیت جدید
    chrome.storage.sync.set({ rtlEnabled: newState }, () => {
      // ارسال پیام به content script
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { rtlEnabled: newState });
      });
    });
  });
});
