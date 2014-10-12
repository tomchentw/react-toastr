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

  clear () {
    var {refs} = this,
        key;
    for (key in refs) {
      refs[key].hideToast(false);
    }
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
      toastId: 0,
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
    var key = state.toastId++;
    var newToast = update(optionsOverride || {}, {
      $merge: {
        type,
        title,
        message,
        key,
        ref: `toasts__${ key }`,
        handleOnClick: this._handleToastOnClick,
        handleRemove: this._handleToastRemove
      }
    });
    var toastOperation = {};
    toastOperation[(props.newestOnTop ? "$unshift" : "$push")] = [newToast];

    var newState = update(state, {
      toasts: toastOperation,
      previousMessage: { $set: message }
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

  _handleToastRemove (key) {
    var {state} = this;
    state.toasts[(this.props.newestOnTop ? "reduceRight" : "reduce")]((found, toast, index) => {
      if (found || toast.key !== key) {
        return false;
      }
      this.setState(update(state, {
        toasts: { $splice: [[index, 1]] }
      }));
      return true;
    }, false);
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
