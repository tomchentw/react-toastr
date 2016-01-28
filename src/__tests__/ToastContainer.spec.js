/* eslint-disable prefer-arrow-callback */

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

describe(`ToastContainer`, function describeToastContainer() {
  let dom;

  beforeEach(function beforeEach() {
    dom = document.createElement(`div`);
  });

  afterEach(function afterEach() {
    ReactDOM.unmountComponentAtNode(dom);
  });

  context(`renders a toast message`, function contextRendersAToastMessage() {
    it(`exists in the container`, function it() {
      const component = ReactDOM.render((
        <ToastContainer toastMessageFactory={React.createFactory(ToastMessage.animation)} />
      ), dom);
      expect(dom.firstChild.childNodes.length).toBe(0);

      component.success(`yeah,`, `cool`);
      expect(dom.firstChild.childNodes.length).toNotBe(0);
    });

    it(`should be closed by clicking on it`, function it(done) {
      const component = ReactDOM.render((
        <ToastContainer toastMessageFactory={React.createFactory(ToastMessage.animation)} />
      ), dom);

      component.success(`yeah,`, `cool`);
      expect(dom.firstChild.childNodes.length).toNotBe(0);

      const toastComp = TestUtils.findRenderedDOMComponentWithClass(component, `toast`);
      TestUtils.Simulate.click(toastComp);

      setTimeout(() => {
        expect(dom.firstChild.childNodes.length).toBe(0);
        done();
      }, 500);
    });
  });

  context(`when component function is triggered multiple times`, function contextWhenComponent() {
    it(`renders a list of toast messages`, function it() {
      const component = ReactDOM.render((
        <ToastContainer toastMessageFactory={React.createFactory(ToastMessage.animation)} />
      ), dom);
      component.success(`yeah`, `cool`);
      component.error(`blabla`, `foobar`);

      expect(dom.firstChild.childNodes.length).toBe(2);

      const errorDom = dom.firstChild.childNodes[0];
      expect(errorDom.classList.contains(`toast-error`)).toBe(true);
      expect(errorDom.childNodes[0].textContent).toBe(`foobar`);
      expect(errorDom.childNodes[1].textContent).toBe(`blabla`);

      const successDom = dom.firstChild.childNodes[1];
      expect(successDom.classList.contains(`toast-success`)).toBe(true);
      expect(successDom.childNodes[0].textContent).toBe(`cool`);
      expect(successDom.childNodes[1].textContent).toBe(`yeah`);
    });
  });
});
