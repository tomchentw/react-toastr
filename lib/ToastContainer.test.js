import { default as React } from "react";

import { default as ReactDOM } from "react-dom";

import { default as TestUtils } from "react-dom/test-utils";

import { ToastContainer, ToastMessage } from "./index";

describe("ToastContainer", function () {
  var dom = void 0;

  beforeEach(function () {
    dom = document.createElement("div");
  });

  afterEach(function () {
    ReactDOM.unmountComponentAtNode(dom);
  });

  describe("renders a toast message", function () {
    it("exists in the container", function () {
      var component = ReactDOM.render(React.createElement(ToastContainer, { toastMessageFactory: React.createFactory(ToastMessage.animation) }), dom);
      expect(dom.firstChild.childNodes.length).toBe(0);

      component.success("yeah,", "cool");
      expect(dom.firstChild.childNodes.length).not.toBe(0);
    });

    it("should be closed by clicking on it", function it(done) {
      var component = ReactDOM.render(React.createElement(ToastContainer, { toastMessageFactory: React.createFactory(ToastMessage.animation) }), dom);

      component.success("yeah,", "cool");
      expect(dom.firstChild.childNodes.length).not.toBe(0);

      var toastComp = TestUtils.findRenderedDOMComponentWithClass(component, "toast");
      TestUtils.Simulate.click(toastComp);

      setTimeout(function () {
        expect(dom.firstChild.childNodes.length).toBe(0);
        done();
      }, 500);
    });
  });

  describe("when component function is triggered multiple times", function () {
    it("renders a list of toast messages", function () {
      var component = ReactDOM.render(React.createElement(ToastContainer, { toastMessageFactory: React.createFactory(ToastMessage.animation) }), dom);
      component.success("yeah", "cool");
      component.error("blabla", "foobar");

      expect(dom.firstChild.childNodes.length).toBe(2);

      var errorDom = dom.firstChild.childNodes[0];
      expect(errorDom.classList.contains("toast-error")).toBe(true);
      expect(errorDom.childNodes[0].textContent).toBe("foobar");
      expect(errorDom.childNodes[1].textContent).toBe("blabla");

      var successDom = dom.firstChild.childNodes[1];
      expect(successDom.classList.contains("toast-success")).toBe(true);
      expect(successDom.childNodes[0].textContent).toBe("cool");
      expect(successDom.childNodes[1].textContent).toBe("yeah");
    });
  });
});