/** @jsx React.DOM */
require("../styles/index.scss");
var React = require("react/addons");
var Container = require("../../src");

var Hello = React.createClass({
  addAlert () {
    this.refs.container.success("hi! Now" + new Date(), "///title\\\\\\");
  },

  render: function() {
    return <div>
      <Container ref="container" className="toast-top-right" />
      <p onClick={this.addAlert}>Hello {this.props.name}</p>
    </div>;
  }
});
 
React.renderComponent(<Hello name="World" />, document.body);
