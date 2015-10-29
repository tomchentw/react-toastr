import {
  default as expect,
  createSpy,
} from "expect";

import {
  default as React,
} from "react";

import {
  default as ReactDOM,
} from "react-dom";

import {
  default as TestUtils,
} from "react-addons-test-utils";

import {
  default as $,
} from "jquery";

import {
  ToastMessage,
} from "../index";

describe(`ToastMessage`, () => {
  before(() => {
    global.jQuery = $;
  });

  after(() => {
    delete global.jQuery;
  });

  describe(`auto close`, () => {
    it(`will call handleRemove with given props`, (done) => {
      const spy = createSpy();
      const ref = TestUtils.renderIntoDocument(
        <ToastMessage.jQuery
          timeOut={1}
          showDuration={50}
          hideDuration={50}
          handleRemove={spy}
        />
      );
      const dom = ReactDOM.findDOMNode(ref);
      expect(spy).toNotHaveBeenCalled();

      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
        done();
      }, 150);
    });
  });
});
