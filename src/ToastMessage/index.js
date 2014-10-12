/** @jsx React.DOM */
var React = require("react/addons");

function noop () {}

module.exports = React.createClass({
  displayName: "ToastMessage",

  getDefaultProps () {
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

  handleOnClick (event) {
    this.props.handleOnClick(event);
    this._hideToast();
  },

  _hideToast: noop,//tapToDismiss

  render () {
    var cx = React.addons.classSet;
    var props = this.props;
    var iconClassName = props.iconClassName || props.iconClassNames[props.type];

    var toastClass = {};
    toastClass[props.className] = true;
    toastClass[iconClassName] = true;

    return (
      <div className={cx(toastClass)} onClick={this.handleOnClick}>
        {this._render_close_button(props)}
        {this._render_title_element(props)}
        {this._render_message_element(props)}
      </div>
    );
  }
});
