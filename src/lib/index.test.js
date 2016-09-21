import {
  ToastContainer,
  ToastMessage,
} from "./index";

describe(`index`, () => {
  it(`should be exported as ES2015 module`, () => {
    expect(ToastContainer).toBeDefined();
    expect(ToastMessage).toBeDefined();
  });
});
