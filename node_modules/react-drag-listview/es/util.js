/* global Element */

if (typeof Element !== 'undefined' && !Element.prototype.matches) {
  var proto = Element.prototype;
  proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
}

var closest = function closest(el, selector, rootNode) {
  var element = el;
  while (element) {
    var isRoot = element === rootNode || element === document.body;
    if (isRoot || element.nodeType === 1 && element.matches(selector)) {
      if (isRoot) {
        element = null;
      }
      break;
    }
    element = element.parentNode;
  }
  return element;
};

var getScrollElement = function getScrollElement(el) {
  var element = el;
  do {
    var _window$getComputedSt = window.getComputedStyle(element),
        overflow = _window$getComputedSt.overflow;

    if ((overflow === 'auto' || overflow === 'scroll') && element && element.nodeType && (element.offsetWidth < element.scrollWidth || element.offsetHeight < element.scrollHeight)) {
      break;
    }
    if (!element || !element.nodeType || element === document.body) {
      element = null;
      break;
    }
    element = element.parentNode;
  } while (element);
  return element;
};

var getDomIndex = function getDomIndex(el, ignoreSelectors) {
  return Array.from(el.parentNode.children).filter(function (e) {
    return ignoreSelectors === '' ? true : !e.matches(ignoreSelectors);
  }).indexOf(el);
};

export { getScrollElement, closest, getDomIndex };