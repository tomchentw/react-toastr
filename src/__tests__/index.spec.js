import {
  default as expect,
} from "expect";

import {
  ToastContainer,
  ToastMessage,
} from "../index";

describe(`index`, () => {
  it(`should be exported as ES2015 module`, () => {
    expect(ToastContainer).toExist();
    expect(ToastMessage).toExist();
  });

  it(`should be exported as CommonJS module`, () => {
    const {ToastContainer, ToastMessage} = require("../../lib/index");

    expect(ToastContainer).toExist();
    expect(ToastMessage).toExist();
  });
});
