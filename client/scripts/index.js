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
      <p onClick={this.addAlert}>Hello {this.props.name}</p>
      <button onClick={this.clearAlert}>CLEAR</button>
    </div>;
  }
});
 
React.renderComponent(<Hello name="World" />, document.body);
