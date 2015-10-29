"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactAddonsUpdate = require("react-addons-update");

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _ToastMessage = require("./ToastMessage");

var _ToastMessage2 = _interopRequireDefault(_ToastMessage);

function noop() {}

exports["default"] = _react2["default"].createClass({
  displayName: "ToastContainer",

  error: function error(message, title, optionsOverride) {
    this._notify(this.props.toastType.error, message, title, optionsOverride);
  },

  info: function info(message, title, optionsOverride) {
    this._notify(this.props.toastType.info, message, title, optionsOverride);
  },

  success: function success(message, title, optionsOverride) {
    this._notify(this.props.toastType.success, message, title, optionsOverride);
  },

  warning: function warning(message, title, optionsOverride) {
    this._notify(this.props.toastType.warning, message, title, optionsOverride);
  },

  clear: function clear() {
    var refs = this.refs;
    var key;
    for (key in refs) {
      refs[key].hideToast(false);
    }
  },

  getDefaultProps: function getDefaultProps() {
    return {
      toastType: {
        error: "error",
        info: "info",
        success: "success",
        warning: "warning"
      },
      id: "toast-container",
      toastMessageFactory: _react2["default"].createFactory(_ToastMessage2["default"]),
      preventDuplicates: false,
      newestOnTop: true,
      onClick: noop
    };
  },

  getInitialState: function getInitialState() {
    return {
      toasts: [],
      toastId: 0,
      previousMessage: null
    };
  },

  render: function render() {
    return this._render(this.props, this.state);
  },

  _notify: function _notify(type, message, title, optionsOverride) {
    var props = this.props;
    var state = this.state;

    if (props.preventDuplicates) {
      if (state.previousMessage === message) {
        return;
      }
    }
    var key = state.toastId++;
    var toastId = key;
    var newToast = (0, _reactAddonsUpdate2["default"])(optionsOverride || {}, {
      $merge: {
        toastId: toastId,
        toastType: type,
        title: title,
        message: message,
        key: key,
        ref: "toasts__" + key,
        onClick: this._handle_toast_on_click,
        onRemove: this._handle_toast_remove
      }
    });
    var toastOperation = {};
    toastOperation["" + (props.newestOnTop ? "$unshift" : "$push")] = [newToast];

    var newState = (0, _reactAddonsUpdate2["default"])(state, {
      toasts: toastOperation,
      previousMessage: { $set: message }
    });
    this.setState(newState);
  },

  _handle_toast_on_click: function _handle_toast_on_click(event) {
    this.props.onClick(event);
    if (event.defaultPrevented) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
  },

  _handle_toast_remove: function _handle_toast_remove(toastId) {
    var _this = this;

    var state = this.state;

    state.toasts["" + (this.props.newestOnTop ? "reduceRight" : "reduce")](function (found, toast, index) {
      if (found || toast.toastId !== toastId) {
        return false;
      }
      _this.setState((0, _reactAddonsUpdate2["default"])(state, {
        toasts: { $splice: [[index, 1]] }
      }));
      return true;
    }, false);
  },

  _render: function _render(props, state) {
    return _react2["default"].createElement(
      "div",
      _extends({}, props, { "aria-live": "polite", role: "alert" }),
      state.toasts.map(function (toast) {
        return props.toastMessageFactory(toast);
      })
    );
  }
});
module.exports = exports["default"];