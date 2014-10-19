/** @jsx React.DOM */
var React = require("react/addons");
var $__0=  React.addons,update=$__0.update;

var ToastMessage = require("./ToastMessage");

function noop () {}

module.exports = React.createClass({
  displayName: "ToastContainer",

  error:function (message, title, optionsOverride) {
    this._notify(this.props.toastType.error, message, title, optionsOverride);
  },

  info:function (message, title, optionsOverride) {
    this._notify(this.props.toastType.info, message, title, optionsOverride);
  },

  success:function (message, title, optionsOverride) {
    this._notify(this.props.toastType.success, message, title, optionsOverride);
  },

  warning:function (message, title, optionsOverride) {
    this._notify(this.props.toastType.warning, message, title, optionsOverride);
  },

  clear:function () {
    var $__0=  this,refs=$__0.refs,
        key;
    for (key in refs) {
      refs[key].hideToast(false);
    }
  },

  getDefaultProps:function () {
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

  getInitialState:function () {
    return {
      toasts: [],
      toastId: 0,
      previousMessage: null
    };
  },

  render:function () {
    var $__0=   this,props=$__0.props,state=$__0.state;
    return this.transferPropsTo(
      React.DOM.div({'aria-live': "polite", role: "alert"}, 
        state.toasts.map(function(toast)  {
          return props.toastMessageClass(toast);
        })
      )
    );
  },

  _notify:function (type, message, title, optionsOverride) {
    var $__0=   this,props=$__0.props,state=$__0.state;
    if (props.preventDuplicates) {
      if (state.previousMessage === message) {
        return;
      }
    }
    var key = state.toastId++;
    var newToast = update(optionsOverride || {}, {
      $merge: {
        type:type,
        title:title,
        message:message,
        key:key,
        ref: ("toasts__" +  key),
        handleOnClick: this._handle_toast_on_click,
        handleRemove: this._handle_toast_remove
      }
    });
    var toastOperation = {};
    toastOperation[(( props.newestOnTop ? "$unshift" : "$push"))] = [newToast];

    var newState = update(state, {
      toasts: toastOperation,
      previousMessage: { $set: message }
    });
    this.setState(newState);
  },

  _handle_toast_on_click:function (event) {
    this.props.onClick(event);
    if (event.defaultPrevented) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
  },

  _handle_toast_remove:function (key) {
    var $__0=  this,state=$__0.state;
    state.toasts[(( this.props.newestOnTop ? "reduceRight" : "reduce"))](function(found, toast, index)  {
      if (found || toast.key !== key) {
        return false;
      }
      this.setState(update(state, {
        toasts: { $splice: [[index, 1]] }
      }));
      return true;
    }.bind(this), false);
  }
});
