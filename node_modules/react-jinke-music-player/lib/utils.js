"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTime = formatTime;
exports.createRandomNum = createRandomNum;
exports.distinct = distinct;
exports.isSafari = exports.uuId = exports.arrayEqual = void 0;

//秒转换成 时间格式
function formatTime(second) {
  var i = 0;
  var h = 0;
  var s = parseInt(second);

  if (s > 60) {
    i = parseInt(s / 60);
    s = parseInt(s % 60);

    if (i > 60) {
      h = parseInt(i / 60);
      i = parseInt(i % 60);
    }
  } // 补零


  var zero = function zero(v) {
    return v >> 0 < 10 ? "0".concat(v) : v;
  };

  if (h > 0) return [zero(h), zero(i), zero(s)].join(':');else return [zero(i), zero(s)].join(':');
}

function createRandomNum(minNum, maxNum) {
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
}

function distinct(array) {
  return array.map(function (item) {
    return JSON.stringify(item);
  }).filter(function (item, idx, arry) {
    return idx === arry.indexOf(item);
  }).map(function (item) {
    return JSON.parse(item);
  });
}

var arrayEqual = function arrayEqual(arr1) {
  return function (arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  };
};

exports.arrayEqual = arrayEqual;

var s4 = function s4() {
  return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
}; // Generate a pseudo-GUID by concatenating random hexadecimal.


var uuId = function uuId() {
  return "".concat(s4() + s4(), "-").concat(s4(), "-").concat(s4(), "-").concat(s4(), "-").concat(s4()).concat(s4()).concat(s4());
};

exports.uuId = uuId;

var isSafari = function isSafari() {
  return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
};

exports.isSafari = isSafari;