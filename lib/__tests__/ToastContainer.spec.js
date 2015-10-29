"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _expect = require("expect");

var _expect2 = _interopRequireDefault(_expect);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsTestUtils = require("react-addons-test-utils");

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _index = require("../index");

describe("ToastContainer", function () {
  describe("when component function is triggered", function () {
    describe("renders a toast message", function () {
      it("exists in the container", function () {
        var ref = _reactAddonsTestUtils2["default"].renderIntoDocument(_react2["default"].createElement(_index.ToastContainer, { toastMessageFactory: _react2["default"].createFactory(_index.ToastMessage.animation) }));
        var dom = _reactDom2["default"].findDOMNode(ref);
        (0, _expect2["default"])(dom.childNodes.length).toBe(0);

        ref.success("yeah,", "cool");
        (0, _expect2["default"])(dom.childNodes.length).toNotBe(0);
      });

      it("should be closed by clicking on it", function (done) {
        var ref = _reactAddonsTestUtils2["default"].renderIntoDocument(_react2["default"].createElement(_index.ToastContainer, { toastMessageFactory: _react2["default"].createFactory(_index.ToastMessage.animation) }));
        var dom = _reactDom2["default"].findDOMNode(ref);

        ref.success("yeah,", "cool");
        (0, _expect2["default"])(dom.childNodes.length).toNotBe(0);

        var toastDom = dom.childNodes[0];
        _reactAddonsTestUtils2["default"].Simulate.click(toastDom);

        setTimeout(function () {
          (0, _expect2["default"])(dom.childNodes.length).toBe(0);
          done();
        }, 500);
      });
    });

    it("renders a list of toast messages", function () {
      var ref = _reactAddonsTestUtils2["default"].renderIntoDocument(_react2["default"].createElement(_index.ToastContainer, { toastMessageFactory: _react2["default"].createFactory(_index.ToastMessage.animation) }));
      ref.success("yeah", "cool");
      ref.error("blabla", "foobar");

      var dom = _reactDom2["default"].findDOMNode(ref);
      (0, _expect2["default"])(dom.childNodes.length).toBe(2);

      var errorDom = dom.childNodes[0];
      (0, _expect2["default"])(errorDom.classList.contains("toast-error")).toBe(true);
      (0, _expect2["default"])(errorDom.childNodes[0].textContent).toBe("foobar");
      (0, _expect2["default"])(errorDom.childNodes[1].textContent).toBe("blabla");

      var successDom = dom.childNodes[1];
      (0, _expect2["default"])(successDom.classList.contains("toast-success")).toBe(true);
      (0, _expect2["default"])(successDom.childNodes[0].textContent).toBe("cool");
      (0, _expect2["default"])(successDom.childNodes[1].textContent).toBe("yeah");
    });
  });
});