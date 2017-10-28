"use strict"

Object.defineProperty(exports, "__esModule", {
  value: true,
})
exports.ToastMessage = undefined

var _extends2 = require("babel-runtime/helpers/extends")

var _extends3 = _interopRequireDefault(_extends2)

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties")

var _objectWithoutProperties3 = _interopRequireDefault(
  _objectWithoutProperties2
)

var _noop2 = require("lodash/noop")

var _noop3 = _interopRequireDefault(_noop2)

var _classnames = require("classnames")

var _classnames2 = _interopRequireDefault(_classnames)

var _react = require("react")

var _react2 = _interopRequireDefault(_react)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

var defaultIconClassNames = {
  error: "toast-error",
  info: "toast-info",
  success: "toast-success",
  warning: "toast-warning",
}

/**
 * Base component for displaying a toast message.
 */
var ToastMessage = function ToastMessage(_ref) {
  var _ref$className = _ref.className,
    className = _ref$className === undefined ? "toast" : _ref$className,
    type = _ref.type,
    _ref$iconClassNames = _ref.iconClassNames,
    iconClassNames =
      _ref$iconClassNames === undefined
        ? defaultIconClassNames
        : _ref$iconClassNames,
    _ref$iconClassName = _ref.iconClassName,
    iconClassName =
      _ref$iconClassName === undefined
        ? iconClassNames[type]
        : _ref$iconClassName,
    _ref$closeButton = _ref.closeButton,
    closeButton = _ref$closeButton === undefined ? false : _ref$closeButton,
    _ref$onCloseClick = _ref.onCloseClick,
    onCloseClick =
      _ref$onCloseClick === undefined ? _noop3.default : _ref$onCloseClick,
    _ref$title = _ref.title,
    title = _ref$title === undefined ? false : _ref$title,
    _ref$titleClassName = _ref.titleClassName,
    titleClassName =
      _ref$titleClassName === undefined ? "toast-title" : _ref$titleClassName,
    _ref$message = _ref.message,
    message = _ref$message === undefined ? false : _ref$message,
    _ref$messageClassName = _ref.messageClassName,
    messageClassName =
      _ref$messageClassName === undefined
        ? "toast-message"
        : _ref$messageClassName,
    restProps = (0, _objectWithoutProperties3.default)(_ref, [
      "className",
      "type",
      "iconClassNames",
      "iconClassName",
      "closeButton",
      "onCloseClick",
      "title",
      "titleClassName",
      "message",
      "messageClassName",
    ])
  return _react2.default.createElement(
    "div",
    (0, _extends3.default)({}, restProps, {
      className: (0, _classnames2.default)(className, iconClassName),
    }),
    !!closeButton &&
      _react2.default.createElement("button", {
        className: "toast-close-button",
        onClick: onCloseClick,
        dangerouslySetInnerHTML: { __html: "&times;" },
      }),
    !!title &&
      _react2.default.createElement(
        "div",
        { className: titleClassName },
        title
      ),
    !!message &&
      _react2.default.createElement(
        "div",
        { className: messageClassName },
        message
      )
  )
}

exports.ToastMessage = ToastMessage
exports.default = ToastMessage
