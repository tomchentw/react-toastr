"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsTestUtils = require("react-addons-test-utils");

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("ToastContainer", function () {
  var dom = void 0;

  beforeEach(function () {
    dom = document.createElement("div");
  });

  afterEach(function () {
    _reactDom2.default.unmountComponentAtNode(dom);
  });

  describe("renders a toast message", function () {
    it("exists in the container", function () {
      var component = _reactDom2.default.render(_react2.default.createElement(_index.ToastContainer, { toastMessageFactory: _react2.default.createFactory(_index.ToastMessage.animation) }), dom);
      expect(dom.firstChild.childNodes.length).toBe(0);

      component.success("yeah,", "cool");
      expect(dom.firstChild.childNodes.length).not.toBe(0);
    });

    it("should be closed by clicking on it", function it(done) {
      var component = _reactDom2.default.render(_react2.default.createElement(_index.ToastContainer, { toastMessageFactory: _react2.default.createFactory(_index.ToastMessage.animation) }), dom);

      component.success("yeah,", "cool");
      expect(dom.firstChild.childNodes.length).not.toBe(0);

      var toastComp = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(component, "toast");
      _reactAddonsTestUtils2.default.Simulate.click(toastComp);

      setTimeout(function () {
        expect(dom.firstChild.childNodes.length).toBe(0);
        done();
      }, 500);
    });
  });

  describe("when component function is triggered multiple times", function () {
    it("renders a list of toast messages", function () {
      var component = _reactDom2.default.render(_react2.default.createElement(_index.ToastContainer, { toastMessageFactory: _react2.default.createFactory(_index.ToastMessage.animation) }), dom);
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