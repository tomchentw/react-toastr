"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react");
var update = require('react-addons-update');

var ToastMessage = React.createFactory(require("./ToastMessage"));

function noop() {}

module.exports = React.createClass({
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
      toastMessageFactory: ToastMessage,
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

  _notify: function _notify(type, message, title) {
    var _this = this;

    var optionsOverride = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
    var props = this.props;
    var state = this.state;

    if (props.preventDuplicates) {
      if (state.previousMessage === message) {
        return;
      }
    }
    var key = state.toastId++;
    var toastId = key;
    var newToast = update(optionsOverride, {
      $merge: {
        type: type,
        title: title,
        message: message,
        toastId: toastId,
        key: key,
        ref: "toasts__" + key,
        handleOnClick: function handleOnClick(e) {
          if ("function" === typeof optionsOverride.handleOnClick) {
            optionsOverride.handleOnClick();
          }
          return _this._handle_toast_on_click(e);
        },
        handleRemove: this._handle_toast_remove
      }
    });
    var toastOperation = {};
    toastOperation["" + (props.newestOnTop ? "$unshift" : "$push")] = [newToast];

    var newState = update(state, {
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
    var _this2 = this;

    var state = this.state;

    state.toasts["" + (this.props.newestOnTop ? "reduceRight" : "reduce")](function (found, toast, index) {
      if (found || toast.toastId !== toastId) {
        return false;
      }
      _this2.setState(update(state, {
        toasts: { $splice: [[index, 1]] }
      }));
      return true;
    }, false);
  },

  _render: function _render(props, state) {
    return React.createElement(
      "div",
      _extends({}, props, { "aria-live": "polite", role: "alert" }),
      state.toasts.map(function (toast) {
        return props.toastMessageFactory(toast);
      })
    );
  }
});