import { ToastContainer, ToastMessage } from "./index";

describe("index", function () {
  it("should be exported as ES2015 module", function () {
    expect(ToastContainer).toBeDefined();
    expect(ToastMessage).toBeDefined();
  });
});