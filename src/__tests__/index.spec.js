/* eslint-disable prefer-arrow-callback */

import {
  default as expect,
} from "expect";

import {
  ToastContainer,
  ToastMessage,
} from "../index";

describe(`index`, function describeIndex() {
  it(`should be exported as ES2015 module`, function it() {
    expect(ToastContainer).toExist();
    expect(ToastMessage).toExist();
  });
});
