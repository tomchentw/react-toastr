"use strict";
/** @jsx React.DOM */

jest.dontMock("../index.js");
describe("index", function() {
  it("changes the text after click", function() {
    var index = require("../index");

    expect(index).toBeDefined();
    expect(index.ToastContainer).toBeDefined();
    expect(index.ToastMessage).toBeDefined();
  });
});
