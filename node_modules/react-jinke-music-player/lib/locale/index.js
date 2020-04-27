"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _locale2 = _interopRequireDefault(require("../config/locale"));

var _en_US = _interopRequireDefault(require("./en_US"));

var _zh_CN = _interopRequireDefault(require("./zh_CN"));

var _locale;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var locale = (_locale = {}, _defineProperty(_locale, _locale2["default"].en_US, _en_US["default"]), _defineProperty(_locale, _locale2["default"].zh_CN, _zh_CN["default"]), _locale);
var _default = locale;
exports["default"] = _default;