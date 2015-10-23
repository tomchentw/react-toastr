"use strict";
var React = require("react");
var update = require('react-addons-update');
var cx = require("classnames");

function noop () {}

var ToastMessageSpec = {
  displayName: "ToastMessage",

  getDefaultProps () {
    var iconClassNames = {
      error: "toast-error",
      info: "toast-info",
      success: "toast-success",
      warning: "toast-warning",
    };

    return {
      className: "toast",
      iconClassNames: iconClassNames,
      titleClassName: "toast-title",
      messageClassName: "toast-message",
      tapToDismiss: true,
      closeButton: false,
    };
  },

  handleOnClick (event) {
    var {props} = this;
    props.handleOnClick(event);
    if (props.tapToDismiss) {
      this.hideToast(true);
    }
  },

  _handle_close_button_click (event) {
    event.stopPropagation();
    this.hideToast(true);
  },

  _handle_remove () {
    var {props} = this;
    props.handleRemove(props.toastId);
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
    var iconClassName = props.iconClassName || props.iconClassNames[props.type];

    var toastClass = {};
    toastClass[props.className] = true;
    toastClass[iconClassName] = true;

    return (
      <div className={cx(toastClass)} style={props.style || {}}
            onClick={this.handleOnClick}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}>
        {this._render_close_button(props)}
        {this._render_title_element(props)}
        {this._render_message_element(props)}
      </div>
    );
  },
};


var animation = React.createClass(update(ToastMessageSpec, {
  displayName: { $set: "ToastMessage.animation" },
  mixins: { $set: [require("./animationMixin")] },
}));

var jQuery = React.createClass(update(ToastMessageSpec, {
  displayName: { $set: "ToastMessage.jQuery" },
  mixins: { $set: [require("./jQueryMixin")] },
}));

/*
 * assign default noop functions
 */
ToastMessageSpec.handleMouseEnter = noop;
ToastMessageSpec.handleMouseLeave = noop;
ToastMessageSpec.hideToast = noop;

var ToastMessage = module.exports = React.createClass(ToastMessageSpec);
ToastMessage.animation = animation;
ToastMessage.jQuery = jQuery;
