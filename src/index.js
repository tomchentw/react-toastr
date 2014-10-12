/** @jsx React.DOM */
var React = require("react/addons");

var AlertMessage = React.createClass({
  displayName: "AlertMessage",

  getDefaultProps () {
    return {
      className: "toast-info",
      titleClassName: "toast-title",
      messageClassName: "toast-message",
      closeButton: false
    };
  },

  _render_close_button (props) {
    return props.closeButton ? (
      <button className="toast-close-button" role="button">&times;</button>
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
    var cx = React.addons.classSet;
    var props = this.props;
    var toastClass = {
      toast: true
    };
    toastClass[props.className] = true;
     
    return (
      <div className={cx(toastClass)}>
        {this._render_close_button(props)}
        {this._render_title_element(props)}
        {this._render_message_element(props)}
      </div>
    );
  }
});

module.exports = React.createClass({
  displayName: "Container",

  getInitialState () {
    return {
      toasts: []
    };
  },

  success(message, title, optionsOverride) {
    this.state.toasts.push({
      title,
      message,
      className: "toast-success"// error, info, success, warning
    });
    this.setState(this.state);
  }, 

  render () {
    return this.transferPropsTo(
      <div aria-live="polite" role="alert">
        {this.state.toasts.map((toast) => {
          return AlertMessage(toast);
        })}
      </div>
    );
  }
});
