"use strict";

var _index = require("./index");

describe("index", function () {
  it("should be exported as ES2015 module", function () {
    expect(_index.ToastContainer).toBeDefined();
    expect(_index.ToastMessage).toBeDefined();
  });
});