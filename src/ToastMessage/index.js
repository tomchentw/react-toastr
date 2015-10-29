import {
  default as React,
  PropTypes,
} from "react";

import {
  default as update,
} from "react-addons-update";

import {
  default as cx,
} from "classnames";

function noop () {}

export const itemShapeDefinition = {
  toastId: PropTypes.string.isRequired,
  toastType: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
};

const ToastMessageSpec = {
  displayName: "ToastMessage",

  getDefaultProps () {
    const iconClassNames = {
      error: "toast-error",
      info: "toast-info",
      success: "toast-success",
      warning: "toast-warning",
    };

    return {
      onClick: noop,
      className: "toast",
      iconClassNames: iconClassNames,
      titleClassName: "toast-title",
      messageClassName: "toast-message",
      tapToDismiss: true,
      closeButton: false,
    };
  },

  handleOnClick (event) {
    this.props.onClick(event);
    if (this.props.tapToDismiss) {
      this.hideToast(true);
    }
  },

  _handle_close_button_click (event) {
    event.stopPropagation();
    this.hideToast(true);
  },

  _handle_remove () {
    this.props.onRemove(this.props.toastId);
  },

  _render_close_button (props) {
    return props.closeButton ? (
      <button className="toast-close-button" role="button"
              onClick={this._handle_close_button_click}
              dangerouslySetInnerHTML={{__html: "&times;"}}
              />
    ) : false;
  },

  _render_title_element (props) {
    return props.title ? (
      <div className={props.titleClassName}>
        {props.title}
      </div>
    ) : false;
  },

  _render_message_element (props) {
    return props.message ? (
      <div className={props.messageClassName}>
        {props.message}
      </div>
    ) : false;
  },

  render () {
    var {props} = this;
    var iconClassName = props.iconClassName || props.iconClassNames[props.toastType];

    return (
      <div
        className={cx(props.className, iconClassName)}
        style={props.style || {}}
        onClick={this.handleOnClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {this._render_close_button(props)}
        {this._render_title_element(props)}
        {this._render_message_element(props)}
      </div>
    );
  },
};

const animation = React.createClass(update(ToastMessageSpec, {
  displayName: { $set: "ToastMessage.animation" },
  mixins: { $set: [require("./animationMixin")] },
}));

const jQuery = React.createClass(update(ToastMessageSpec, {
  displayName: { $set: "ToastMessage.jQuery" },
  mixins: { $set: [require("./jQueryMixin")] },
}));

/*
 * assign default noop functions
 */
ToastMessageSpec.handleMouseEnter = noop;
ToastMessageSpec.handleMouseLeave = noop;
ToastMessageSpec.hideToast = noop;

const ToastMessage = React.createClass(ToastMessageSpec);

ToastMessage.animation = animation;

ToastMessage.jQuery = jQuery;

export default ToastMessage;
