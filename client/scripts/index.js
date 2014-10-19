/** @jsx React.DOM */
require("../styles/index.scss");
var React = require("react/addons");
var {ToastContainer, ToastMessage} = require("../../src");

var Hello = React.createClass({
  addAlert () {
    this.refs.container.success("hi! Now" + new Date(), "///title\\\\\\", {
      closeButton: true
    });
  },

  clearAlert () {
    this.refs.container.clear();
  },

  render: function() {
    return <div>
      <ToastContainer toastMessageClass={ToastMessage.jQuery} ref="container" className="toast-top-right" />

      <h1>
        React-Toastr
        <small>React.js toastr component</small>
      </h1>

      <div className="btn-container">
        <button className="primary" onClick={this.addAlert}>Hello {this.props.name}</button>
        <button className="primary" onClick={this.clearAlert}>CLEAR</button>
      </div>

    </div>;
  }
});


React.renderComponent(<Hello name="World" />, document.getElementById("react-root"));
