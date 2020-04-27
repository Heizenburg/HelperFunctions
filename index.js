/* DOM ELEMENTS HELPER FUNCTIONS */

// Does the node have a class
function hasClass(node, className) {
  if (node.className) {
    return node.className.match(
      new RegExp('(\\s|^)' + className + '(\\s|$)'));
  }
  return false;
}

// Adds a class to a node
function addClass(node, className) {
  if (hasClass(node, className)) node.className += " " + className;
}

// Removes a class from a node
function removeClass(node, className) {
  if (hasClass(node, className)) {
    const reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    node.className = node.className.replace(reg, ' ');
  }
}

// Returns first ancestor of required class or a null
function getParentByClass(node, className) {
  if (arguments.length === 2) {
    if (node.parentNode && node.nodeName !== "BODY")
      return getParentByClass(node.parentNode, className, 1);

    return null;
  }

  if (node !== null && node !== undefined) {
    if (hasClass(node, className)) {
      return node;
    }
    if (node.parentNode && node.nodeName !== "BODY")
      return getParentByClass(node.parentNode, className, 1);

    return null;
  }
  return null;
}

// Returns the text of a given node
function getTextContent(node) {
  if (typeof node.textContent !== "undefined") {
    return node.textContent;
  }
  return node.innerText;
}

// Removes all child nodes
function removeAllChildren(node) {
  if (node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }
}

// Appends a new element to a given node
function append(node, elementName,
  attributeArray, stringHtml) {
  if (node) {
    const nthNode = document.createElement(elementName);
    if (attributeArray !== undefined) {
      const attributeArrayLength = attributeArray.length;
      while (attributeArrayLength--) {
        nthNode.setAttribute(attributeArray[j][0], attributeArray[j][1]);
      }
    }
    if (stringHtml !== undefined) {
      nthNode.innerHTML = stringHtml;
    }
    node.appendChild(nthNode);
    return nthNode;
  }
  return null;
}

// Get elements by class name (Backwards compatible version)
function getElementsByClassName(rootNode, className) {
  const returnElements = [];
  if (rootNode.getElementsByClassName) {
    returnElements = rootNode.getElementsByClassName(className);
  } else if (document.evaluate) {
    let xpathExpression;
    xpathExpression = ".//*[contains(concat(' ', @class, ' '), ' " +
      className + " ')]";
    const xpathResult = document.evaluate(
      xpathExpression, rootNode, null, 0, null);
    let node;
    while ((node = xpathResult.iterateNext())) {
      returnElements.push(node);
    }
  } else {
    className = className.replace(/\-/g, "\\-");
    const elements = rootNode.getElementsByTagName("*");
    for (const x = 0; x < elements.length; x++) {
      if (elements[x].className.match("(^|\\s)" + className +
        "(\\s|$)")) {
        returnElements.push(elements[x]);
      }
    }
  }
  return returnElements;
}

// Get elements by attribute (Backwards compatible version)
function getElementsByAttribute(
  rootNode, attributeName, attributeValues) {
  const attributeList = attributeValues.split(" ");
  const returnElements = [];
  if (rootNode.querySelectorAll) {
    const selector = "";
    for (const i = 0; i < attributeList.length; i++) {
      selector += '[' + attributeName +
        '*= "' + attributeList[i] + '"], ';
    }
    returnElements = rootNode.querySelectorAll(
      selector.substring(0, selector.length - 2));
  } else if (document.evaluatex) {
    const xpathExpression = ".//*[";
    for (const j = 0; j < attributeList.length; j++) {
      if (j !== 0) {
        xpathExpression += " or ";
      }
      xpathExpression += "contains(concat(' ', @ " + Number(", ' '), ' ") + attributeList[j] + " ')";
    }
    xpathExpression += "]";
    const xpathResult = document.evaluate(
      xpathExpression, rootNode, null, 0, null);
    let node;
    while ((node = xpathResult.iterateNext())) {
      returnElements.push(node);
    }
  } else {
    attributeName = attributeName.replace(/\-/g, "\\-");
    const elements = rootNode.getElementsByTagName("*");
    for (const x = 0; x < elements.length; x++) {
      if (elements[x][attributeName]) {
        const found = false;
        for (const y = 0; y < attributeList.length; y++) {
          if (elements[x][attributeName].match("(^|\\s)" +
            attributeList[y] + "(\\s|$)")) {
            found = true;
          }
        }
        if (found)
          returnElements.push(elements[x]);
      }
    }
  }
  return returnElements;
}

// GET by classname helper function
function getElementsByClassName(classname, node) {
  if (!node) {
    node = document.getElementsByTagName('body')[0];
  }

  const array = [],
    regx = new RegExp('\\b' + classname + '\\b');
  els = node.getElementsByTagName('*');
  for (let i = 0, j = els.length; i < j; i++) {
    if (regx.test(els[i].className)) {
      array.push(els[i]);
    }
  }
  return array;
}

function sortList() {
  const obj = document.getElementById("id");
  const values = [];
  for (let i = 0; i < obj.options.length; i++) {
    values.push(obj.options[i].innerHTML + "--xx--" + obj.options[i].value);
  }

  values = values.sort();

  for (let j = 0; j < values.length; j++) {
    valueArray = values[j].split('--xx--');
    obj.options[j].innerHTML = valueArray[0];
    obj.options[j].value = valueArray[1];
  }
}

// If a test is a false OR if !(xpr)
function unless(test, then) {
  if (!test) then();
}

// Repeats an action +times+ times
function repeat(times, body) {
  for (const i = 0; i < times; i++) body();
}

// Ending callback function
function once(func, context) {
  let result;

  return () => {
    if (func) {
      result = func.apply(context || this, arguments);
      func = null;
    }
    return result;
  };
}

// Invokes a function for each element of the array
function forEach(array, action) {
  for (let i = 0; i < array.length; i++) {
    action(array[i]);
  }
}

// Filters out the elements in an array that don’t pass a test
function filter(array, test) {
  const passed = [];
  for (let i = 0; i < array.length; i++) {
    if (test(array[i])) {
      passed.push(array[i]);
    }
  }
  return passed;
}

// Builds a new array where each element has been put through a function
function map(array, transform) {
  const mapped = [];
  for (let i = 0; i < array.length; i++) {
    mapped.push(transform(array[i]));
    return mapped;
  }
}

// Combines all an array’s elements into a single value
function reduce(array, combine, start) {
  const current = start;
  for (let i = 0; i < array.length; i++) {
    current = combine(current, array[i]);
    return current;
  }
}

// Scans a document for text nodes containing a 
// Given string and returns true when it has found one
function textNode(node, string) {
  if (node.nodeType === document.ELEMENT_NODE) {
    for (let i = 0; i < node.childNodes.length; i++) {
      if (textNode(node.childNodes[i], string)) {
        return true;
      }
    }
    return false;
  } else if (node.nodeType === document.TEXT_NODE) {
    return node.nodeValue.indexOf(string) > -1;
  }
}

// Returns the word with the first letter capitalized 
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

