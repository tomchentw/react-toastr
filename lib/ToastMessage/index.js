import createReactClass from "create-react-class";

import { default as React } from "react";

import { default as update } from "immutability-helper";

import { default as classNames } from "classnames";

import { default as animationMixin } from "./animationMixin";

import { default as jQueryMixin } from "./jQueryMixin";

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
    return this.props.closeButton ? React.createElement("button", {
      className: "toast-close-button",
      onClick: this._handle_close_button_click,
      dangerouslySetInnerHTML: { __html: "&times;" }
    }) : false;
  },
  _render_title_element: function _render_title_element() {
    return this.props.title ? React.createElement(
      "div",
      { className: this.props.titleClassName },
      this.props.title
    ) : false;
  },
  _render_message_element: function _render_message_element() {
    return this.props.message ? React.createElement(
      "div",
      { className: this.props.messageClassName },
      this.props.message
    ) : false;
  },
  render: function render() {
    var iconClassName = this.props.iconClassName || this.props.iconClassNames[this.props.type];

    return React.createElement(
      "div",
      {
        className: classNames(this.props.className, iconClassName),
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

export var animation = createReactClass(update(ToastMessageSpec, {
  displayName: { $set: "ToastMessage.animation" },
  mixins: { $set: [animationMixin] }
}));

export var jQuery = createReactClass(update(ToastMessageSpec, {
  displayName: { $set: "ToastMessage.jQuery" },
  mixins: { $set: [jQueryMixin] }
}));

/*
 * assign default noop functions
 */
ToastMessageSpec.handleMouseEnter = noop;
ToastMessageSpec.handleMouseLeave = noop;
ToastMessageSpec.hideToast = noop;

var ToastMessage = createReactClass(ToastMessageSpec);

ToastMessage.animation = animation;
ToastMessage.jQuery = jQuery;

export default ToastMessage;