import {
  default as expect,
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
  ToastContainer,
  ToastMessage,
} from "../index";

describe(`ToastContainer`, () => {
  describe(`when component function is triggered`, () => {
    describe(`renders a toast message`, () => {
      it(`exists in the container`, () => {
        const ref = TestUtils.renderIntoDocument(
          <ToastContainer toastMessageFactory={React.createFactory(ToastMessage.animation)} />
        );
        const dom = ReactDOM.findDOMNode(ref);
        expect(dom.childNodes.length).toBe(0);

        ref.success(`yeah,`, `cool`);
        expect(dom.childNodes.length).toNotBe(0);
      });

      it(`should be closed by clicking on it`, (done) => {
        const ref = TestUtils.renderIntoDocument(
          <ToastContainer toastMessageFactory={React.createFactory(ToastMessage.animation)} />
        );
        const dom = ReactDOM.findDOMNode(ref);

        ref.success(`yeah,`, `cool`);
        expect(dom.childNodes.length).toNotBe(0);

        const toastDom = dom.childNodes[0];
        TestUtils.Simulate.click(toastDom);

        setTimeout(() => {
          expect(dom.childNodes.length).toBe(0);
          done();
        }, 500);
      });
    });
  });
});
