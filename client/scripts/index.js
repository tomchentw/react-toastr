/** @jsx React.DOM */
require("../styles/index.scss");
var React = require("react/addons");
var Container = require("../../src");

var Hello = React.createClass({
  addAlert () {
    this.refs.container.success("hi", "title~~~~");
  },

  render: function() {
    return <div onClick={this.addAlert}>
      <Container ref="container" className="toast-top-right" />
      Hello {this.props.name}
    </div>;
  }
});
 
React.renderComponent(<Hello name="World" />, document.body);
