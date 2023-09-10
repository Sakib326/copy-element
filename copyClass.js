// copyClass Chrome web extension

// try onmouseover listener?  - no need

// ---------------------- START CODE -------------------------------------

if (document.getElementById("copyClasswDiv")) {
  document.body.removeChild(document.getElementById("copyClasswDiv"));
}
var nStyle,
  wStyle,
  dispID,
  dispClass,
  dispTag,
  showString,
  theme,
  textSize,
  divLoc,
  bgVar,
  wrapperPos;
var body = document.getElementsByTagName("BODY")[0];
var newDiv = [];
var numDivs = 0;
var elems = document.getElementsByTagName("*");

addHover();
addClickListeners();
var wrapperDiv = document.createElement("div");
wrapperDiv.id = "copyClasswDiv";
// wrapper element to put stripe in for moving/dragging
body.insertBefore(wrapperDiv, body.firstChild);
wStyle = wrapperDiv.style;
chrome.storage.sync.get(null, function (options) {
  theme = options.theme;
  textSize = options.textSize;
  divLoc = options.divLoc;
  wrapperPos = divLoc;
  setPos();
  setTheme();
  setTextSize();
});
wStyle.whiteSpace = "pre-wrap";
wStyle.display = "inline-block";
wStyle.position = "fixed";
wStyle.fontFamily = "monospace";
wStyle.overflow = "hidden"; // change back to 'none' ?
wStyle.width = "100%";
wStyle.zIndex = 999998;
wStyle.left = "0px";
wStyle.margin = "0px";
wrapperDiv.addEventListener("click", togglePos);

function setTheme() {
  //set div theme based on options
  if (theme === "light") {
    bgVar = "lightyellow";
    wStyle.color = "black";
    wStyle.backgroundColor = bgVar;
  } else {
    bgVar = "#00008B";
    wStyle.color = "white";
    wStyle.backgroundColor = bgVar;
  }
}
function setTextSize() {
  //set div text size based on options
  //small: 0.7em
  //medium: 1.2em
  //large: 1.7em
  switch (textSize) {
    case "small":
      wStyle.fontSize = "0.7em";
      break;
    case "medium":
      wStyle.fontSize = "1.2em";
      break;
    case "large":
      wStyle.fontSize = "1.7em";
      break;
    default:
      wStyle.fontSize = "1.2em";
  }
  wStyle.height = "1.4em";
  wStyle.lineHeight = "110%";
}
function setPos() {
  //set div position based on options
  if (wrapperPos == "bottom") {
    wStyle.bottom = "0px";
  } else {
    wStyle.top = "0px";
  }
}
function togglePos() {
  if (wrapperPos == "top") {
    //move to bottom
    wrapperPos = "bottom";
    wStyle.top = "";
    wStyle.bottom = "0px";
  } else {
    //move to top
    wrapperPos = "top";
    wStyle.bottom = "";
    wStyle.top = "0px";
  }
}
function addHover() {
  // add hover listeners
  for (i = 0; i < elems.length; i++) {
    elems[i].addEventListener("mouseenter", elemShow);
    elems[i].addEventListener("mouseleave", elemRem);
  }
}

function elemShow() {
  numDivs++;
  dispID = this.id;
  dispClass = this.className;
  dispTag = "<" + this.tagName + ">";
  newDiv[numDivs] = document.createElement("div");
  newDiv[numDivs].scrollTop = 0;
  newDiv[numDivs].textContent = "";
  newDiv[numDivs].id = "id" + numDivs;
  nStyle = newDiv[numDivs].style;
  nStyle.color = wStyle.color;
  newDiv[numDivs - 1].style.color = bgVar;
  showString =
    " Element: " +
    dispTag +
    "    ID: " +
    dispID +
    "    Class(es): " +
    dispClass;
  nStyle.display = "inline-block";
  nStyle.position = "absolute";
  nStyle.overflow = "hidden"; // try playing with 'auto' or 'scroll' here
  resetDivHeight();
  nStyle.width = "100%";
  nStyle.backgroundColor = bgVar;
  nStyle.zIndex = 999999 + numDivs;
  nStyle.left = "0px";
  nStyle.top = "0px";
  nStyle.margin = "0px";
  nStyle.padding = "2px";
  newDiv[numDivs].textContent = showString;
  wrapperDiv.insertBefore(newDiv[numDivs], wrapperDiv.firstChild);
  makeBigger(0);
  // try this: newDiv[numDivs].scrollIntoView();

  // add click event listener
  newDiv[numDivs].addEventListener("click", copyIDandClass);
}

function copyIDandClass() {
  console.log("test");
  // get the ID and class of the element
  var id = this.id;
  var classVal = this.className;

  // copy the ID and class to the clipboard
  var copyText = id + "\n" + classVal;
  navigator.clipboard.writeText(copyText);
}

function elemRem() {
  //remove current div
  wrapperDiv.removeChild(document.getElementById("id" + numDivs));
  newDiv[numDivs].id = "";
  numDivs--;
  newDiv[numDivs].style.color = wStyle.color;
  resetDivHeight();
  makeBigger(0);
}

function makeBigger(biggerVar) {
  //if text overflows, make div bigger
  if (newDiv[numDivs].scrollHeight > wrapperDiv.clientHeight) {
    tempHeight = Number(wStyle.height.slice(0, wStyle.height.length - 2));
    tempHeight = tempHeight + 1;
    wStyle.height = "" + tempHeight + "em";
    nStyle.height = wStyle.height;
    // compare again, if still not big enough, call function again
    // only calling once b/c some sites cause freezing, keep looping
    if (
      newDiv[numDivs].scrollHeight > wrapperDiv.clientHeight &&
      biggerVar < 1
    ) {
      biggerVar++;
      makeBigger(biggerVar);
    }
  }
}

function resetDivHeight() {
  // to reset div height in case it was enlarged
  wStyle.height = "1.4em";
  nStyle.height = "1.1em";
}

function replSpaces(thisStr) {
  //remove extra spaces in string
}

// New Lines Added

function addClickListeners() {
  // Add click event listeners to the elements
  for (i = 0; i < elems.length; i++) {
    elems[i].addEventListener("click", elemShowOnClick);
    elems[i].addEventListener("contextmenu", elemShowOnClick);
  }
}

// document.addEventListener("contextmenu", function (e) {
//   e.preventDefault();
// });

function elemShowOnClick(event) {
  // This function will now trigger when an element is clicked
  var clickedElement = event.target;

  var data = {
    id: clickedElement?.id,
    class: clickedElement?.className,
    tag: "<" + clickedElement.tagName + ">",
  };

  var jsonData = JSON.stringify(data);

  navigator.clipboard.writeText(jsonData);
}
