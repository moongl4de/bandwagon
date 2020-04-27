"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Icon = require("./Icon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Load = function Load() {
  return /*#__PURE__*/_react["default"].createElement("span", {
    className: "loading group"
  }, /*#__PURE__*/_react["default"].createElement(_Icon.LoadIcon, null));
};

var _default = Load;
exports["default"] = _default;