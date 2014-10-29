"use strict";
require("../styles/index.scss");

var React = require("react/addons");
var ReactToastr = require("../../src");
var {ToastContainer} = ReactToastr;
var ToastMessage = React.createFactory(ReactToastr.ToastMessage.jQuery);

var Body = React.createClass({
  addAlert () {
    this.refs.container.success("hi! Now" + new Date(), "///title\\\\\\", {
      closeButton: true
    });
  },

  clearAlert () {
    this.refs.container.clear();
  },

  render: function() {
    return <div id="react-root">
      <ToastContainer toastMessageClass={ToastMessage} ref="container" className="toast-top-right" />

      <h1>
        React-Toastr
        <small>React.js toastr component</small>
      </h1>



      <div className="btn-container">
        <button className="primary" onClick={this.addAlert}>Hello {this.props.name}</button>
        <button className="primary" onClick={this.clearAlert}>CLEAR</button>
      </div>

      <div className="github-button-container">
        <iframe src="http://ghbtns.com/github-btn.html?user=tomchentw&amp;repo=react-toastr&amp;type=watch&amp;count=true" allowTransparency="true" frameBorder="0" scrolling="0" width="90" height="20"></iframe>
        <iframe src="http://ghbtns.com/github-btn.html?user=tomchentw&amp;repo=react-toastr&amp;type=fork&amp;count=true" allowTransparency="true" frameBorder="0" scrolling="0" width="90" height="20"></iframe>
      </div>
    </div>;
  }
});


React.renderComponent(<Hello name="World" />, document.body);
