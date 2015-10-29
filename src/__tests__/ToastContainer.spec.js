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

    it(`renders a list of toast messages`, () => {
      const ref = TestUtils.renderIntoDocument(
        <ToastContainer toastMessageFactory={React.createFactory(ToastMessage.animation)} />
      );
      ref.success(`yeah`, `cool`);
      ref.error(`blabla`, `foobar`);

      const dom = ReactDOM.findDOMNode(ref);
      expect(dom.childNodes.length).toBe(2);

      const errorDom = dom.childNodes[0];
      expect(errorDom.classList.contains(`toast-error`)).toBe(true);
      expect(errorDom.childNodes[0].textContent).toBe(`foobar`);
      expect(errorDom.childNodes[1].textContent).toBe(`blabla`);

      const successDom = dom.childNodes[1];
      expect(successDom.classList.contains(`toast-success`)).toBe(true);
      expect(successDom.childNodes[0].textContent).toBe(`cool`);
      expect(successDom.childNodes[1].textContent).toBe(`yeah`);
    });
  });
});
