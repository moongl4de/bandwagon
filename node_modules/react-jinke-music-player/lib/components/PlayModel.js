"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PlayModel = function PlayModel(_ref) {
  var visible = _ref.visible,
      value = _ref.value;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])('play-mode-title', {
      'play-mode-title-visible': visible
    })
  }, value);
};

var _default = PlayModel;
exports["default"] = _default;