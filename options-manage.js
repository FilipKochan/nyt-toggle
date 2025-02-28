function registerNewKey(event) {
  const main = document.getElementById("main-content");
  const registering = document.getElementById("registering");
  registering.style.display = "block";
  main.style.display = "none";

  document.addEventListener("keydown", handleRegisterNewKey);
}

function handleRegisterNewKey(event) {
  document.removeEventListener("keydown", handleRegisterNewKey);

  chrome.storage.sync.get({ toggleKeys: ["t", "0"] }, (data) => {
    chrome.storage.sync.set(
      {
        toggleKeys: [...data.toggleKeys, event.key.toLowerCase()],
      },
      () => {
        const main = document.getElementById("main-content");
        const registering = document.getElementById("registering");
        registering.style.display = "none";
        main.style.display = "block";
        createKeysList();
      }
    );
  });
}

function unregisterKey(key) {
  chrome.storage.sync.get({ toggleKeys: ["t", "0"] }, (data) => {
    chrome.storage.sync.set(
      {
        toggleKeys: data.toggleKeys.filter((k) => k !== key),
      },
      createKeysList
    );
  });
}

function createKeysList() {
  chrome.storage.sync.get({ toggleKeys: ["t", "0"] }, (data) => {
    const list = document.getElementById("keys");
    list.innerHTML = "";
    console.log(data.toggleKeys);
    for (const key of data.toggleKeys) {
      const row = document.createElement("li");
      const span = document.createElement("span");
      span.innerHTML = key;
      const unregister = document.createElement("button");
      unregister.innerHTML = "Unregister";
      unregister.onclick = () => unregisterKey(key);
      unregister.style.marginLeft = "1em";
      row.appendChild(span);
      row.appendChild(unregister);
      list.appendChild(row);
    }

    const empty = document.getElementById("no-keys");
    if (data.toggleKeys.length === 0) {
      empty.style.display = "block";
      list.style.display = "none";
    } else {
      empty.style.display = "none";
      list.style.display = "flex";
    }
  });
}

createKeysList();

document.getElementById("save").addEventListener("click", registerNewKey);
