const buttonLimit = document.getElementById("buttonLimit");
if (buttonLimit) {
  buttonLimit.onclick = function () {
    const minCpu = document.getElementById('minCpu').value;
    const maxCpu = document.getElementById('maxCpu').value;
    const minMem = document.getElementById('minMem').value;
    const maxMem = document.getElementById('maxMem').value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          minCpu: minCpu,
          maxCpu: maxCpu,
          minMem: minMem,
          maxMem: maxMem,
          action: "limit"
        },
        function (response) {
          console.log("message with url sent");
          window.close();
        }
      );
    });
  };
}

const buttonReset = document.getElementById("buttonReset");
if (buttonReset) {
  buttonReset.onclick = function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          action: "reset"
        },
        function (response) {
          console.log("message with url sent");
          window.close();
        }
      );
    });
  };
}