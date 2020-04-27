import React from 'react';
import cls from 'classnames';

var PlayModel = function PlayModel(_ref) {
  var visible = _ref.visible,
      value = _ref.value;
  return /*#__PURE__*/React.createElement("div", {
    className: cls('play-mode-title', {
      'play-mode-title-visible': visible
    })
  }, value);
};

export default PlayModel;