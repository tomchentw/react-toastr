"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _expect = require("expect");

var _expect2 = _interopRequireDefault(_expect);

var _index = require("../index");

describe("index", function () {
  it("should be exported as ES2015 module", function () {
    (0, _expect2["default"])(_index.ToastContainer).toExist();
    (0, _expect2["default"])(_index.ToastMessage).toExist();
  });

  it("should be exported as CommonJS module", function () {
    var _require = require("../../lib/index");

    var ToastContainer = _require.ToastContainer;
    var ToastMessage = _require.ToastMessage;

    (0, _expect2["default"])(ToastContainer).toExist();
    (0, _expect2["default"])(ToastMessage).toExist();
  });
});