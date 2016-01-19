"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jQuery = exports.animation = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactAddonsUpdate = require("react-addons-update");

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _animationMixin = require("./animationMixin");

var _animationMixin2 = _interopRequireDefault(_animationMixin);

var _jQueryMixin = require("./jQueryMixin");

var _jQueryMixin2 = _interopRequireDefault(_jQueryMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function noop() {}

var ToastMessageSpec = {
  displayName: "ToastMessage",

  getDefaultProps: function getDefaultProps() {
    var iconClassNames = {
      error: "toast-error",
      info: "toast-info",
      success: "toast-success",
      warning: "toast-warning"
    };

    return {
      className: "toast",
      iconClassNames: iconClassNames,
      titleClassName: "toast-title",
      messageClassName: "toast-message",
      tapToDismiss: true,
      closeButton: false
    };
  },
  handleOnClick: function handleOnClick(event) {
    this.props.handleOnClick(event);
    if (this.props.tapToDismiss) {
      this.hideToast(true);
    }
  },
  _handle_close_button_click: function _handle_close_button_click(event) {
    event.stopPropagation();
    this.hideToast(true);
  },
  _handle_remove: function _handle_remove() {
    this.props.handleRemove(this.props.toastId);
  },
  _render_close_button: function _render_close_button() {
    return this.props.closeButton ? _react2.default.createElement("button", {
      className: "toast-close-button", role: "button",
      onClick: this._handle_close_button_click,
      dangerouslySetInnerHTML: { __html: "&times;" }
    }) : false;
  },
  _render_title_element: function _render_title_element() {
    return this.props.title ? _react2.default.createElement(
      "div",
      { className: this.props.titleClassName },
      this.props.title
    ) : false;
  },
  _render_message_element: function _render_message_element() {
    return this.props.message ? _react2.default.createElement(
      "div",
      { className: this.props.messageClassName },
      this.props.message
    ) : false;
  },
  render: function render() {
    var iconClassName = this.props.iconClassName || this.props.iconClassNames[this.props.type];

    return _react2.default.createElement(
      "div",
      {
        className: (0, _classnames2.default)(this.props.className, iconClassName),
        style: this.props.style,
        onClick: this.handleOnClick,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave
      },
      this._render_close_button(),
      this._render_title_element(),
      this._render_message_element()
    );
  }
};

var animation = exports.animation = _react2.default.createClass((0, _reactAddonsUpdate2.default)(ToastMessageSpec, {
  displayName: { $set: "ToastMessage.animation" },
  mixins: { $set: [_animationMixin2.default] }
}));

var jQuery = exports.jQuery = _react2.default.createClass((0, _reactAddonsUpdate2.default)(ToastMessageSpec, {
  displayName: { $set: "ToastMessage.jQuery" },
  mixins: { $set: [_jQueryMixin2.default] }
}));

/*
 * assign default noop functions
 */
ToastMessageSpec.handleMouseEnter = noop;
ToastMessageSpec.handleMouseLeave = noop;
ToastMessageSpec.hideToast = noop;

var ToastMessage = _react2.default.createClass(ToastMessageSpec);

ToastMessage.animation = animation;
ToastMessage.jQuery = jQuery;

exports.default = ToastMessage;