"use strict";

var _expect = require("expect");

var _expect2 = _interopRequireDefault(_expect);

var _index = require("../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prefer-arrow-callback */

describe("index", function describeIndex() {
  it("should be exported as ES2015 module", function it() {
    (0, _expect2.default)(_index.ToastContainer).toExist();
    (0, _expect2.default)(_index.ToastMessage).toExist();
  });
});