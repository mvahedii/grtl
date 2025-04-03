let rtlEnabled = false;

function updateRTL() {
  const elements = document.querySelectorAll("div[dir]");
  elements.forEach((element) => {
    if (rtlEnabled) {
      element.setAttribute("dir", "rtl");
    } else {
      element.setAttribute("dir", "auto");
    }
  });
}

chrome.runtime.onMessage.addListener((message) => {
  rtlEnabled = message.rtlEnabled;
  updateRTL();
});

window.addEventListener("load", () => {
  chrome.storage.sync.get(["rtlEnabled"], (result) => {
    rtlEnabled = result.rtlEnabled || false;
    updateRTL();
  });
});

const observer = new MutationObserver(() => {
  updateRTL();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
