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

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _index = require("../index");

describe("ToastMessage", function () {
  before(function () {
    global.jQuery = _jquery2["default"];
  });

  after(function () {
    delete global.jQuery;
  });

  describe("auto close", function () {
    it("will call handleRemove with given props", function (done) {
      var spy = (0, _expect.createSpy)();
      var ref = _reactAddonsTestUtils2["default"].renderIntoDocument(_react2["default"].createElement(_index.ToastMessage.jQuery, {
        timeOut: 1,
        showDuration: 50,
        hideDuration: 50,
        handleRemove: spy
      }));
      var dom = _reactDom2["default"].findDOMNode(ref);
      (0, _expect2["default"])(spy).toNotHaveBeenCalled();

      setTimeout(function () {
        (0, _expect2["default"])(spy).toHaveBeenCalled();
        done();
      }, 150);
    });
  });
});