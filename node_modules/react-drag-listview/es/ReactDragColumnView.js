import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import ReactDragListView from './ReactDragListView';

var UNIT_PX = 'px';
var DRAG_LIND_STYLE = 'width:0;margin-left:-1px;margin-top:0;' + 'border-bottom:0 none;border-left:dashed 2px red;';
var DIRECTIONS = {
  RIGHT: 2,
  LEFT: 4
};

var ReactDragColumnView = function (_ReactDragListView) {
  _inherits(ReactDragColumnView, _ReactDragListView);

  function ReactDragColumnView() {
    _classCallCheck(this, ReactDragColumnView);

    return _possibleConstructorReturn(this, (ReactDragColumnView.__proto__ || Object.getPrototypeOf(ReactDragColumnView)).apply(this, arguments));
  }

  _createClass(ReactDragColumnView, [{
    key: 'getDragLine',
    value: function getDragLine() {
      if (!this.dragLine) {
        _get(ReactDragColumnView.prototype.__proto__ || Object.getPrototypeOf(ReactDragColumnView.prototype), 'getDragLine', this).call(this);
        this.dragLine.setAttribute('style', this.dragLine.getAttribute('style') + DRAG_LIND_STYLE);
      }
      return this.dragLine;
    }
  }, {
    key: 'resolveAutoScroll',
    value: function resolveAutoScroll(e, target) {
      if (!this.scrollElement) {
        return;
      }

      var _scrollElement$getBou = this.scrollElement.getBoundingClientRect(),
          left = _scrollElement$getBou.left,
          width = _scrollElement$getBou.width;

      var targetWidth = target.offsetWidth;
      var pageX = e.pageX;

      var compatibleWidth = targetWidth * 2 / 3;
      this.direction = 0;
      if (pageX > left + width - compatibleWidth) {
        this.direction = DIRECTIONS.RIGHT;
      } else if (pageX < left + compatibleWidth) {
        this.direction = DIRECTIONS.LEFT;
      }
      if (this.direction) {
        if (this.scrollTimerId < 0) {
          this.scrollTimerId = setInterval(this.autoScroll, 20);
        }
      } else {
        this.stopAutoScroll();
      }
    }
  }, {
    key: 'autoScroll',
    value: function autoScroll() {
      var scrollLeft = this.scrollElement.scrollLeft;

      if (this.direction === DIRECTIONS.RIGHT) {
        this.scrollElement.scrollLeft = scrollLeft + this.props.scrollSpeed;
        if (scrollLeft === this.scrollElement.scrollLeft) {
          this.stopAutoScroll();
        }
      } else if (this.direction === DIRECTIONS.LEFT) {
        this.scrollElement.scrollLeft = scrollLeft - this.props.scrollSpeed;
        if (this.scrollElement.scrollLeft <= 0) {
          this.stopAutoScroll();
        }
      } else {
        this.stopAutoScroll();
      }
    }
  }, {
    key: 'fixDragLine',
    value: function fixDragLine(target) {
      var dragLine = this.getDragLine();
      if (!target || this.state.fromIndex < 0 || this.state.fromIndex === this.state.toIndex) {
        this.hideDragLine();
        return;
      }

      var _target$getBoundingCl = target.getBoundingClientRect(),
          left = _target$getBoundingCl.left,
          top = _target$getBoundingCl.top,
          width = _target$getBoundingCl.width,
          height = _target$getBoundingCl.height;

      var lineLeft = this.state.toIndex < this.state.fromIndex ? left : left + width;
      if (this.props.enableScroll && this.scrollElement) {
        var _scrollElement$getBou2 = this.scrollElement.getBoundingClientRect(),
            scrollWidth = _scrollElement$getBou2.width,
            scrollLeft = _scrollElement$getBou2.left;

        if (lineLeft < scrollLeft - 2 || lineLeft > scrollLeft + scrollWidth + 2) {
          this.hideDragLine();
          return;
        }
      }
      dragLine.style.top = top + UNIT_PX;
      dragLine.style.height = height + UNIT_PX;
      dragLine.style.left = lineLeft + UNIT_PX;
      dragLine.style.display = 'block';
    }
  }]);

  return ReactDragColumnView;
}(ReactDragListView);

export default ReactDragColumnView;