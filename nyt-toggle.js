const normal = document.querySelector(".su-keyboard__mode.normal");
const candidate = document.querySelector(".su-keyboard__mode.candidate");
let isNormal = true;

chrome.storage.sync.get({ toggleKeys: ["t", "0"] }, (data) => {
  document.addEventListener("keydown", (event) => {
    if (data.toggleKeys.includes(event.key.toLowerCase())) {
      (isNormal ? candidate : normal).click();
      isNormal = !isNormal;
    }
  });
});
