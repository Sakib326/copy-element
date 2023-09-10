// copyClass options script

document.getElementById("saveButton").addEventListener("click", saveOptions);
document.getElementById("resetButton").addEventListener("click", resetOptions);
document.addEventListener("DOMContentLoaded", loadOptions);
var theme, textSize, divLoc;

// -------------------- SAVE -----------------------------

function saveOptions() {
  //save options to Chrome storage
  //theme setting:
  if (document.getElementById("darkTheme").checked) {
    theme = "dark";
  } else {
    theme = "light";
  }

  // font setting:
  if (document.getElementById("smallFont").checked) {
    textSize = "small";
  } else if (document.getElementById("largeFont").checked) {
    textSize = "large";
  } else {
    textSize = "medium";
  }

  // location setting:
  if (document.getElementById("bottomLoc").checked) {
    divLoc = "bottom";
  } else {
    divLoc = "top";
  }

  chrome.storage.sync.set(
    {
      theme: theme,
      textSize: textSize,
      divLoc: divLoc,
    },
    function () {
      document.getElementById("saveDisplay").textContent = " Saved!";
      setTimeout(function () {
        document.getElementById("saveDisplay").textContent = "";
      }, 800);
    }
  );
}

// -------------------- LOAD -----------------------------

function loadOptions() {
  chrome.storage.sync.get(null, function (options) {
    theme = options.theme;
    textSize = options.textSize;
    divLoc = options.divLoc;
    applyOptions();
  });
}

// -------------------- APPLY -----------------------------

function applyOptions() {
  // theme setting:
  if (theme === "light") {
    document.getElementById("darkTheme").checked = false;
    document.getElementById("lightTheme").checked = true;
  } else {
    document.getElementById("darkTheme").checked = true;
    document.getElementById("lightTheme").checked = false;
  }
  // font setting:
  switch (textSize) {
    case "small":
      document.getElementById("smallFont").checked = true;
      document.getElementById("mediumFont").checked = false;
      document.getElementById("largeFont").checked = false;
      break;
    case "medium":
      document.getElementById("smallFont").checked = false;
      document.getElementById("mediumFont").checked = true;
      document.getElementById("largeFont").checked = false;
      break;
    case "large":
      document.getElementById("smallFont").checked = false;
      document.getElementById("mediumFont").checked = false;
      document.getElementById("largeFont").checked = true;
      break;
  }
  // location setting:
  if (divLoc === "bottom") {
    document.getElementById("bottomLoc").checked = true;
    document.getElementById("topLoc").checked = false;
  } else {
    document.getElementById("bottomLoc").checked = false;
    document.getElementById("topLoc").checked = true;
  }
}

// -------------------- RESET -----------------------------

function resetOptions() {
  // reset options back to default
  // theme (dark):
  document.getElementById("darkTheme").checked = true;
  document.getElementById("lightTheme").checked = false;

  // font setting (medium):
  document.getElementById("smallFont").checked = false;
  document.getElementById("mediumFont").checked = true;
  document.getElementById("largeFont").checked = false;

  // location setting (top):
  document.getElementById("bottomLoc").checked = false;
  document.getElementById("topLoc").checked = true;
}
