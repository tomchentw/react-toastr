/** @jsx React.DOM */
var React = require("react/addons");
var {update} = React.addons;

var ToastMessage = require("./ToastMessage");

function noop () {}

module.exports = React.createClass({
  displayName: "ToastContainer",

  error (message, title, optionsOverride) {
    this._notify(this.props.toastType.error, message, title, optionsOverride);
  },

  info (message, title, optionsOverride) {
    this._notify(this.props.toastType.info, message, title, optionsOverride);
  },

  success (message, title, optionsOverride) {
    this._notify(this.props.toastType.success, message, title, optionsOverride);
  },

  warning (message, title, optionsOverride) {
    this._notify(this.props.toastType.warning, message, title, optionsOverride);
  },

  getDefaultProps () {
    return {
      toastType: {
        error: "error",
        info: "info",
        success: "success",
        warning: "warning"
      },
      id: "toast-container",
      toastMessageClass: ToastMessage,
      preventDuplicates: false,
      newestOnTop: true,
      onClick: noop
    };
  },

  getInitialState () {
    return {
      toasts: [],
      previousMessage: null
    };
  },

  _notify (type, message, title, optionsOverride) {
    var {props, state} = this;
    if (props.preventDuplicates) {
      if (state.previousMessage === message) {
        return;
      }
    }
    var newToast = update(optionsOverride || {}, {
      $merge: {
        type,
        title,
        message,
        handleOnClick: this._handleToastOnClick
      }
    });
    var toastOperation = {};
    toastOperation[(props.newestOnTop ? "$unshift" : "$push")] = [newToast];

    var newState = update(state, {
      previousMessage: { $set: message },
      toasts: toastOperation
    });
    this.setState(newState);
  },

  _handleToastOnClick (event) {
    this.props.onClick(event);
    if (event.defaultPrevented) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
  },

  render () {
    var {props, state} = this;
    return this.transferPropsTo(
      <div aria-live="polite" role="alert">
        {state.toasts.map((toast) => {
          return props.toastMessageClass(toast);
        })}
      </div>
    );
  }
});
