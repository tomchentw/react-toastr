import {
  default as expect,
} from "expect";

import {
  ToastContainer,
  ToastMessage,
} from "../index";

describe(`index`, () => {
  it(`should be exported`, () => {
    expect(ToastContainer).toExist();
    expect(ToastMessage).toExist();
  });
});
