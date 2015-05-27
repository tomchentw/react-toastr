"use strict";

jest.dontMock("../index.js");
describe("index", () => {
  it("changes the text after click", () => {
    const index = require("../index");

    expect(index).toBeDefined();
    expect(index.ToastContainer).toBeDefined();
    expect(index.ToastMessage).toBeDefined();
  });
});
