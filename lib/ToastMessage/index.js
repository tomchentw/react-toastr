"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactAddonsUpdate = require("react-addons-update");

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function noop() {}

var itemShapeDefinition = {
  toastId: _react.PropTypes.string.isRequired,
  toastType: _react.PropTypes.string.isRequired,
  onRemove: _react.PropTypes.func.isRequired,
  onClick: _react.PropTypes.func,
  title: _react.PropTypes.string,
  message: _react.PropTypes.string
};

exports.itemShapeDefinition = itemShapeDefinition;
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
      onClick: noop,
      className: "toast",
      iconClassNames: iconClassNames,
      titleClassName: "toast-title",
      messageClassName: "toast-message",
      tapToDismiss: true,
      closeButton: false
    };
  },

  handleOnClick: function handleOnClick(event) {
    this.props.onClick(event);
    if (this.props.tapToDismiss) {
      this.hideToast(true);
    }
  },

  _handle_close_button_click: function _handle_close_button_click(event) {
    event.stopPropagation();
    this.hideToast(true);
  },

  _handle_remove: function _handle_remove() {
    this.props.onRemove(this.props.toastId);
  },

  _render_close_button: function _render_close_button(props) {
    return props.closeButton ? _react2["default"].createElement("button", { className: "toast-close-button", role: "button",
      onClick: this._handle_close_button_click,
      dangerouslySetInnerHTML: { __html: "&times;" }
    }) : false;
  },

  _render_title_element: function _render_title_element(props) {
    return props.title ? _react2["default"].createElement(
      "div",
      { className: props.titleClassName },
      props.title
    ) : false;
  },

  _render_message_element: function _render_message_element(props) {
    return props.message ? _react2["default"].createElement(
      "div",
      { className: props.messageClassName },
      props.message
    ) : false;
  },

  render: function render() {
    var props = this.props;

    var iconClassName = props.iconClassName || props.iconClassNames[props.toastType];

    return _react2["default"].createElement(
      "div",
      {
        className: (0, _classnames2["default"])(props.className, iconClassName),
        style: props.style || {},
        onClick: this.handleOnClick,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave
      },
      this._render_close_button(props),
      this._render_title_element(props),
      this._render_message_element(props)
    );
  }
};

var animation = _react2["default"].createClass((0, _reactAddonsUpdate2["default"])(ToastMessageSpec, {
  displayName: { $set: "ToastMessage.animation" },
  mixins: { $set: [require("./animationMixin")] }
}));

var jQuery = _react2["default"].createClass((0, _reactAddonsUpdate2["default"])(ToastMessageSpec, {
  displayName: { $set: "ToastMessage.jQuery" },
  mixins: { $set: [require("./jQueryMixin")] }
}));

/*
 * assign default noop functions
 */
ToastMessageSpec.handleMouseEnter = noop;
ToastMessageSpec.handleMouseLeave = noop;
ToastMessageSpec.hideToast = noop;

var ToastMessage = _react2["default"].createClass(ToastMessageSpec);

ToastMessage.animation = animation;

ToastMessage.jQuery = jQuery;

exports["default"] = ToastMessage;