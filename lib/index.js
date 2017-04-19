'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _clipboard = require('./clipboard');

var _clipboard2 = _interopRequireDefault(_clipboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ReactClipBoard = _react2.default.createClass({
  displayName: 'ReactClipBoard',


  propTypes: {
    text: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    onCopy: PropTypes.func,
    onFail: PropTypes.func
  },

  onClick: function onClick(event) {
    var _props = this.props,
        text = _props.text,
        onCopy = _props.onCopy,
        onFail = _props.onFail;

    _clipboard2.default.copy(text, function () {
      onCopy && onCopy();
    }, function () {
      onFail && onFail();
    });
  },
  componentWillUnmount: function componentWillUnmount() {
    _clipboard2.default.destroy();
  },
  render: function render() {
    var _props2 = this.props,
        _text = _props2.text,
        _onCopy = _props2.onCopy,
        onFail = _props2.onFail,
        _onFail = _props2._onFail,
        _options = _props2.options,
        children = _props2.children,
        props = _objectWithoutProperties(_props2, ['text', 'onCopy', 'onFail', '_onFail', 'options', 'children']);

    var elem = _react2.default.Children.only(children);

    return _react2.default.cloneElement(elem, _extends({}, props, { onClick: this.onClick.bind(this) }));
  }
});

exports.default = ReactClipBoard;