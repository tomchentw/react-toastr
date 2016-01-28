"use strict";

var _expect = require("expect");

var _expect2 = _interopRequireDefault(_expect);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsTestUtils = require("react-addons-test-utils");

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _index = require("../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("ToastContainer", function describeToastContainer() {
  var dom = undefined;

  beforeEach(function beforeEach() {
    dom = document.createElement("div");
  });

  afterEach(function afterEach() {
    _reactDom2.default.unmountComponentAtNode(dom);
  });

  context("renders a toast message", function contextRendersAToastMessage() {
    it("exists in the container", function it() {
      var component = _reactDom2.default.render(_react2.default.createElement(_index.ToastContainer, { toastMessageFactory: _react2.default.createFactory(_index.ToastMessage.animation) }), dom);
      (0, _expect2.default)(dom.firstChild.childNodes.length).toBe(0);

      component.success("yeah,", "cool");
      (0, _expect2.default)(dom.firstChild.childNodes.length).toNotBe(0);
    });

    it("should be closed by clicking on it", function it(done) {
      var component = _reactDom2.default.render(_react2.default.createElement(_index.ToastContainer, { toastMessageFactory: _react2.default.createFactory(_index.ToastMessage.animation) }), dom);

      component.success("yeah,", "cool");
      (0, _expect2.default)(dom.firstChild.childNodes.length).toNotBe(0);

      var toastComp = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(component, "toast");
      _reactAddonsTestUtils2.default.Simulate.click(toastComp);

      setTimeout(function () {
        (0, _expect2.default)(dom.firstChild.childNodes.length).toBe(0);
        done();
      }, 500);
    });
  });

  context("when component function is triggered multiple times", function contextWhenComponent() {
    it("renders a list of toast messages", function it() {
      var component = _reactDom2.default.render(_react2.default.createElement(_index.ToastContainer, { toastMessageFactory: _react2.default.createFactory(_index.ToastMessage.animation) }), dom);
      component.success("yeah", "cool");
      component.error("blabla", "foobar");

      (0, _expect2.default)(dom.firstChild.childNodes.length).toBe(2);

      var errorDom = dom.firstChild.childNodes[0];
      (0, _expect2.default)(errorDom.classList.contains("toast-error")).toBe(true);
      (0, _expect2.default)(errorDom.childNodes[0].textContent).toBe("foobar");
      (0, _expect2.default)(errorDom.childNodes[1].textContent).toBe("blabla");

      var successDom = dom.firstChild.childNodes[1];
      (0, _expect2.default)(successDom.classList.contains("toast-success")).toBe(true);
      (0, _expect2.default)(successDom.childNodes[0].textContent).toBe("cool");
      (0, _expect2.default)(successDom.childNodes[1].textContent).toBe("yeah");
    });
  });
}); /* eslint-disable prefer-arrow-callback */