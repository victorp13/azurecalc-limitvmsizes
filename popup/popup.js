const buttonLimit = document.getElementById("buttonLimit");
if (buttonLimit) {
  buttonLimit.onclick = function () {
    const minCpu = sliderCpu.noUiSlider.get()[0];
    const maxCpu = sliderCpu.noUiSlider.get()[1];
    const minMem = sliderMem.noUiSlider.get()[0];
    const maxMem = sliderMem.noUiSlider.get()[1];
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          minCpu: minCpu,
          maxCpu: maxCpu,
          minMem: minMem,
          maxMem: maxMem,
          action: "limit",
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
          action: "reset",
        },
        function (response) {
          console.log("message with url sent");
          window.close();
        }
      );
    });
  };
}

var sliderCpu = document.getElementById("sliderCpu");

noUiSlider.create(sliderCpu, {
  start: [1, 416],
  connect: true,
  tooltips: true,
  format: {
    to: function (value) {
      return value;
    },
    from: function (value) {
      return Number(value);
    },
  },
  snap: true,
  range: {
    min: [1],
    "6.25%": [2],
    "12.5%": [4],
    "18.75%": [6],
    "25%": [8],
    "31.25%": [16],
    "37.5%": [20],
    "43.75%": [24],
    "50%": [32],
    "56.25%": [48],
    "62.5%": [64],
    "68.75%": [72],
    "75%": [80],
    "81.25%": [128],
    "87.5%": [208],
    "93.75%": [340],
    max: [416],
  },
});

if (localStorage["minCpu"]) {
  sliderCpu.noUiSlider.set([localStorage["minCpu"], null]);
}
if (localStorage["maxCpu"]) {
  sliderCpu.noUiSlider.set([null, localStorage["maxCpu"]]);
}

sliderCpu.noUiSlider.on("set", function (values, handle) {
  var values = sliderCpu.noUiSlider.get();
  var value = Number(values[handle]);
  if (handle == 0) {
    localStorage["minCpu"] = value;
  } else {
    localStorage["maxCpu"] = value;
  }
});

var sliderMem = document.getElementById("sliderMem");

noUiSlider.create(sliderMem, {
  start: [1, 11400],
  connect: true,
  tooltips: true,
  format: {
    to: function (value) {
      return value;
    },
    from: function (value) {
      return Number(value);
    },
  },
  snap: true,
  range: {
    min: [1],
    "2%": [2],
    "4%": [4],
    "6%": [6],
    "8%": [8],
    "10%": [14],
    "12%": [16],
    "14%": [28],
    "16%": [32],
    "18%": [48],
    "20%": [56],
    "24%": [64],
    "28%": [80],
    "32%": [112],
    "36%": [128],
    "40%": [219],
    "44%": [224],
    "48%": [256],
    "50%": [438],
    "52%": [448],
    "54%": [512],
    "58%": [875],
    "60%": [1024],
    "65%": [1750],
    "70%": [1792],
    "75%": [2048],
    "80%": [2850],
    "85%": [3800],
    "90%": [3892],
    "95%": [5700],
    max: [11400],
  },
});

if (localStorage["minMem"])
  sliderMem.noUiSlider.set([localStorage["minMem"], null]);
if (localStorage["maxMem"])
  sliderMem.noUiSlider.set([null, localStorage["maxMem"]]);

sliderMem.noUiSlider.on("set", function (values, handle) {
  var values = sliderMem.noUiSlider.get();
  var value = Number(values[handle]);
  if (handle == 0) localStorage["minMem"] = value;
  else localStorage["maxMem"] = value;
});
