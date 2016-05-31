import {
  default as React,
  Component,
} from "react";

import {
  ToastContainer,
  ToastMessage,
} from "react-toastr";

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

export default class ReactRoot extends Component {
  addAlert() {
    this.refs.container.success(`hi! Now is ${new Date()}`, `///title\\\\\\`, {
      closeButton: true,
    });
  }

  clearAlert() {
    this.refs.container.clear();
  }

  render() {
    return (
      <div id="react-root">
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="container"
          className="toast-top-right"
        />

        <h1>
          React-Toastr
          <small>React.js toastr component</small>
        </h1>

        <div className="btn-container">
          <button className="primary" onClick={::this.addAlert}>
            Hello
          </button>
          <button className="primary" onClick={::this.clearAlert}>
            CLEAR
          </button>
        </div>

        <div className="github-button-container">
          <iframe
            src="http://ghbtns.com/github-btn.html?user=tomchentw&amp;repo=react-toastr&amp;type=watch&amp;count=true"
            allowTransparency="true"
            frameBorder="0"
            scrolling="0"
            width="90"
            height="20"
          />
          <iframe
            src="http://ghbtns.com/github-btn.html?user=tomchentw&amp;repo=react-toastr&amp;type=fork&amp;count=true"
            allowTransparency="true"
            frameBorder="0"
            scrolling="0"
            width="90"
            height="20"
          />
        </div>
      </div>
    );
  }
}
