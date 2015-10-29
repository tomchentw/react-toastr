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

function noop() {}

describe("ToastMessageList", function () {
  it("renders a list of toast messages", function () {
    var listFixture = [{
      toastId: "0",
      toastType: "success",
      title: "cool",
      message: "yeah",
      onRemove: noop
    }, {
      toastId: "1",
      toastType: "error",
      title: "foobar",
      message: "blabla",
      onRemove: noop
    }];

    var ref = _reactAddonsTestUtils2["default"].renderIntoDocument(_react2["default"].createElement(_index.ToastMessageList, { list: listFixture }));

    var dom = _reactDom2["default"].findDOMNode(ref);
    (0, _expect2["default"])(dom.childNodes.length).toBe(2);

    var successDom = dom.childNodes[0];
    (0, _expect2["default"])(successDom.classList.contains("toast-success")).toBe(true);
    (0, _expect2["default"])(successDom.childNodes[0].textContent).toBe("cool");
    (0, _expect2["default"])(successDom.childNodes[1].textContent).toBe("yeah");

    var errorDom = dom.childNodes[1];
    (0, _expect2["default"])(errorDom.classList.contains("toast-error")).toBe(true);
    (0, _expect2["default"])(errorDom.childNodes[0].textContent).toBe("foobar");
    (0, _expect2["default"])(errorDom.childNodes[1].textContent).toBe("blabla");
  });
});